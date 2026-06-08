// ./api/Users.jsx
import { supabase } from '../lib/supabaseClient.js'

// localStorage 키 이름 통일
const LS_USER_ID = "user_id";
const LS_SESSION = "sb_session";

function saveSessionToStorage(session) {
  if (!session) return;
  localStorage.setItem(LS_SESSION, JSON.stringify(session));
}

function saveUserIdToStorage(userId) {
  if (!userId) return;
  localStorage.setItem(LS_USER_ID, userId);
}

function clearAuthStorage() {
  localStorage.removeItem(LS_SESSION);
  localStorage.removeItem(LS_USER_ID);
}

export function getStoredSession() {
  try {
    const raw = localStorage.getItem(LS_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredUserId() {
  return localStorage.getItem(LS_USER_ID);
}

// 닉네임 중복 확인
export async function checkNickname(nickname) {
  const { data, error } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle()

  if (error) {
    return { success: false, message: error.message }
  }

  if (data !== null) {
    return { success: false, message: '이미 존재하는 이름입니다.' }
  }

  return { success: true, message: '사용 가능한 이름입니다.' }
}

// 회원가입 
export async function signUpUser(nickname, email, password, repassword) {
  if (!password || password.length < 6) {
    return { success: false, message: "비밀번호는 6자 이상이어야 합니다." };
  }

  if (password !== repassword) {
    return { success: false, message: "비밀번호가 일치하지 않습니다." };
  }

  // 1) Auth 회원가입
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("회원가입 실패:", authError);
    return { success: false, message: authError.message };
  }

  // signUp 성공했는데 user가 없는 경우 방어
  if (!authData.user) {
    return { success: false, message: "회원가입에 실패했습니다(유저 없음)." };
  }

  // 2) profiles 저장
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: authData.user.id,
        nickname,
      },
      { onConflict: "id" }  // PK(id) 충돌이면 update
    );

  if (profileError) {
    console.error("profiles 저장 실패:", profileError);
    return {
      success: false,
      message: "사용자 정보 저장에 실패했습니다.",
    };
  }

  // 3) (선택) 세션 저장
  if (authData.session?.user?.id) {
    saveSessionToStorage(authData.session);
    saveUserIdToStorage(authData.session.user.id);
  }

  return { success: true, user: authData.user };
}


// 로그인
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('로그인 실패:', error)
    return { success: false, message: error.message }
  }

  if (!data.user) {
    return { success: false, message: '로그인에 실패했습니다.' }
  }

  // 프로필이 없으면 생성
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle();

  if (!profile) {
    console.log('프로필이 없습니다. 기본 프로필을 생성합니다.');
    const defaultNickname = email.split('@')[0] || '사용자';

    await supabase
      .from('profiles')
      .upsert(
        {
          id: data.user.id,
          nickname: defaultNickname,
        },
        { onConflict: 'id' }
      );
  }

  saveSessionToStorage(data.session);
  saveUserIdToStorage(data.user.id);

  return { success: true, user: data.user, userId: data.user.id }
}

// 로그아웃
export async function logOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('로그아웃 실패:', error)
    return { success: false, message: error.message }
  }

  clearAuthStorage();
  return { success: true }
}

// 닉네임 변경
export async function updateNickname(userId, newNickname) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ nickname: newNickname })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    return { success: false, message: '닉네임 변경 실패: ' + error.message }
  }

  return { success: true, profile: data }
}

export async function deleteUserClientOnly(id) {
  // profiles만 삭제
  const { error: dbError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)

  if (dbError) {
    return { success: false, message: 'profiles 삭제 실패' }
  }

  // Auth 유저 삭제는 서버에서만 가능
  clearAuthStorage();
  return { success: true, message: "profiles만 삭제되었습니다. Auth 삭제는 서버에서 처리해야 합니다." }
}

export { supabase }
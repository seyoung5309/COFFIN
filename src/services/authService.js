import { supabase } from "../lib/supabaseClient";

// 닉네임 중복 확인
export const checkNickname = async (nickname) => {
  const { data, error } = await supabase
    .from("profile")
    .select("id")
    .eq("nickname", nickname)
    .single();

  if (error && error.code !== "PGRST116") return { error };
  return { isDuplicate: !!data };
};

// 이메일 중복 확인
export const checkEmail = async (email) => {
  const { data, error } = await supabase
    .from("auth.users")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") return { error };
  return { isDuplicate: !!data };
};

// 회원가입
export const signUp = async ({ email, password, nickname }) => {
  // 1. Supabase Auth 회원가입
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };

  // 2. profile 테이블에 닉네임 저장
  const { error: profileError } = await supabase
    .from("profile")
    .insert({ id: data.user.id, nickname });

  if (profileError) return { error: profileError };
  return { user: data.user };
};

// 로그인
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { error };
  return { user: data.user };
};

// 로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return { error };
  return { success: true };
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { error: userError };

  // profile은 CASCADE로 자동 삭제됨
  const { error } = await supabase.rpc("delete_user", { uid: user.id });
  if (error) return { error };
  return { success: true };
};

// 현재 로그인된 유저 가져오기
export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return { error };
  return { user };
};

// 프로필 조회
export const getProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { error: userError };

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return { error };
  return { profile: data };
};

// 닉네임 수정
export const updateNickname = async (nickname) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { error: userError };

  const { error } = await supabase
    .from("profile")
    .update({ nickname })
    .eq("id", user.id);

  if (error) return { error };
  return { success: true };
};

// 프로필 사진 업로드/수정
export const updateProfileImg = async (file) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { error: userError };

  const filePath = `${user.id}/${Date.now()}`;

  // Storage에 업로드
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file, { upsert: true });

  if (uploadError) return { error: uploadError };

  // public URL 가져오기
  const { data: urlData } = supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);

  // profile 테이블에 URL 저장
  const { error: updateError } = await supabase
    .from("profile")
    .update({ img: urlData.publicUrl })
    .eq("id", user.id);

  if (updateError) return { error: updateError };
  return { url: urlData.publicUrl };
};

// 프로필 사진 삭제
export const deleteProfileImg = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) return { error: userError };

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("img")
    .eq("id", user.id)
    .single();

  if (profileError) return { error: profileError };

  // Storage에서 삭제
  const filePath = profile.img.split("profile-img/")[1];
  await supabase.storage.from("profile-img").remove([filePath]);

  // profile 테이블 img를 NULL로
  const { error } = await supabase
    .from("profile")
    .update({ img: null })
    .eq("id", user.id);

  if (error) return { error };
  return { success: true };
};

import { supabase } from "../lib/supabaseClient";

// coffee 상세 정보 불러오기 (전체 연관 데이터 포함)
export const getCoffeeDetail = async (coffeeId) => {
  const { data, error } = await supabase
    .from("coffee")
    .select(
      `
      *,
      coffee_franchise (
        caffeine,
        price,
        link,
        franchise (
          id,
          name
        )
      ),
      coffee_category (
        category (
          id,
          name
        )
      ),
      comment (
        id,
        comment_text,
        created_at,
        user_id,
        profile (
          nickname,
          img
        ),
        comment_like (
          id,
          user_id
        )
      )
    `,
    )
    .eq("id", coffeeId)
    .single();

  if (error) return { error };

  // 댓글 최신순 정렬 + 좋아요 수 집계
  const comments = (data.comment || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(({ comment_like, ...rest }) => ({
      ...rest,
      likeCount: comment_like?.length ?? 0,
    }));

  return {
    data: {
      ...data,
      comment: comments,
    },
  };
};

// 커피 상세 페이지용 연관 커피 불러오기
// (같은 카테고리 기반 → 없으면 이름 키워드로)
export const getRelatedCoffeeForDetail = async (coffeeId, coffeeName) => {
  // 1단계: 현재 커피의 카테고리 조회
  const { data: categoryRows, error: catError } = await supabase
    .from("coffee_category")
    .select("category_id")
    .eq("coffee_id", coffeeId);

  if (!catError && categoryRows?.length > 0) {
    const categoryIds = categoryRows.map((r) => r.category_id);

    // 같은 카테고리에 속한 다른 커피 조회
    const { data: relatedByCategory, error: relError } = await supabase
      .from("coffee_category")
      .select("coffee(*)")
      .in("category_id", categoryIds)
      .neq("coffee_id", coffeeId);

    if (!relError && relatedByCategory?.length > 0) {
      // 중복 제거
      const seen = new Set();
      const merged = [];
      relatedByCategory.forEach(({ coffee }) => {
        if (coffee && !seen.has(coffee.id)) {
          seen.add(coffee.id);
          merged.push(coffee);
        }
      });

      if (merged.length > 0) return { data: merged };
    }
  }

  // 2단계: 카테고리가 없거나 결과가 없을 때 이름 키워드로
  const keywords = coffeeName.split(" ").filter((k) => k.length > 1);
  if (!keywords.length) return { data: [] };

  const results = await Promise.all(
    keywords.map((keyword) =>
      supabase
        .from("coffee")
        .select("*")
        .ilike("name", `%${keyword}%`)
        .neq("id", coffeeId),
    ),
  );

  const seen = new Set();
  const merged = [];
  results.forEach(({ data }) => {
    data?.forEach((coffee) => {
      if (!seen.has(coffee.id)) {
        seen.add(coffee.id);
        merged.push(coffee);
      }
    });
  });

  return { data: merged };
};

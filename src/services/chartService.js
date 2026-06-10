import { supabase } from "../lib/supabaseClient";

// 커피 전체 목록 불러오기
export const getAllCoffee = async () => {
  const { data, error } = await supabase.from("coffee").select("*");

  if (error) return { error };
  return { data };
};

// 검색에 따른 커피 목록 불러오기
export const searchCoffee = async (keyword) => {
  const { data, error } = await supabase
    .from("coffee")
    .select("*")
    .ilike("name", `%${keyword}%`);

  if (error) return { error };
  return { data };
};

// 정렬에 따른 커피 목록 불러오기
export const getSortedCoffee = async (sortType) => {
  // 인기순은 별도 처리
  if (sortType === "popular") {
    return await getPopularCoffee();
  }

  const sortMap = {
    highCaffeine: { column: "caffeine", ascending: false },
    lowCaffeine: { column: "caffeine", ascending: true },
    highPrice: { column: "price", ascending: false },
    lowPrice: { column: "price", ascending: true },
    nameAsc: { column: "name", ascending: true },
    latest: { column: "created_at", ascending: false },
  };
  const sort = sortMap[sortType];
  if (!sort) return { error: { message: "유효하지 않은 정렬 기준." } };

  // price는 coffee_franchise에 있어서 조인 필요
  if (sortType === "highPrice" || sortType === "lowPrice") {
    const { data, error } = await supabase
      .from("coffee")
      .select("*, coffee_franchise(price)")
      .order("price", {
        referencedTable: "coffee_franchise",
        ascending: sort.ascending,
      });

    if (error) return { error };
    return { data };
  }

  const { data, error } = await supabase
    .from("coffee")
    .select("*")
    .order(sort.column, { ascending: sort.ascending });

  if (error) return { error };
  return { data };
};

// 인기순 커피 목록 불러오기 (즐겨찾기 수 기준)
export const getPopularCoffee = async () => {
  const { data, error } = await supabase
    .from("user_like_coffee")
    .select("coffee_id, coffee(*)")
    .order("coffee_id");

  if (error) return { error };

  // 즐겨찾기 수 집계
  const countMap = {};
  data.forEach(({ coffee_id, coffee }) => {
    if (!countMap[coffee_id]) {
      countMap[coffee_id] = { ...coffee, likeCount: 0 };
    }
    countMap[coffee_id].likeCount += 1;
  });

  const sorted = Object.values(countMap).sort(
    (a, b) => b.likeCount - a.likeCount,
  );

  return { data: sorted };
};

// 최신순 커피 목록 불러오기
export const getLatestCoffee = async () => {
  const { data, error } = await supabase
    .from("coffee")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { error };
  return { data };
};

// 랜덤순 커피 목록 불러오기
export const getRandomCoffee = async (limit = 10) => {
  const { data, error } = await supabase.rpc("get_random_coffee", {
    row_limit: limit,
  });

  if (error) return { error };
  return { data };
};

// 당류순 커피 목록 불러오기
export const getCoffeeBySugar = async () => {
  const { data, error } = await supabase
    .from("coffee")
    .select("*")
    .order("sugar", { ascending: false });

  if (error) return { error };
  return { data };
};

// 연관 커피 목록 불러오기
export const getRelatedCoffee = async (coffeeName) => {
  // 이름에서 키워드 추출 (띄어쓰기 기준으로 분리)
  const keywords = coffeeName.split(" ").filter((k) => k.length > 1);

  const results = await Promise.all(
    keywords.map(
      (keyword) =>
        supabase
          .from("coffee")
          .select("*")
          .ilike("name", `%${keyword}%`)
          .neq("name", coffeeName), // 자기 자신 제외
    ),
  );

  // 중복 제거
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

  if (!merged.length) return { data: [] };
  return { data: merged };
};

// 프랜차이즈에 따른 커피 목록 불러오기
export const getCoffeeByFranchise = async (franchiseId) => {
  const { data, error } = await supabase
    .from("coffee_franchise")
    .select("coffee(*), caffeine, price, link")
    .eq("franchise_id", franchiseId);

  if (error) return { error };

  // 프론트에서 쓰기 편하게 평탄화
  const flatData = data.map(({ coffee, caffeine, price, link }) => ({
    ...coffee,
    caffeine,
    price,
    link,
  }));

  return { data: flatData };
};

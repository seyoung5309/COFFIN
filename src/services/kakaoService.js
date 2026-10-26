const KEYWORD_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";

// 카카오 로컬 API(키워드 검색)로 카페(CE7)만 검색한다.
export async function searchCafes(query, size = 5) {
  const key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  if (!key) throw new Error("VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다.");

  const params = new URLSearchParams({
    query,
    category_group_code: "CE7",
    size: String(size),
  });
  const res = await fetch(`${KEYWORD_URL}?${params}`, {
    headers: { Authorization: `KakaoAK ${key}` },
  });
  if (!res.ok) throw new Error(`카카오 API 오류 (${res.status})`);

  const { documents } = await res.json();
  return documents.map((d) => ({
    id: d.id,
    name: d.place_name,
    category: d.category_name.split(" > ").slice(1).join(", "),
    address: d.road_address_name || d.address_name,
    phone: d.phone,
    url: d.place_url,
  }));
}

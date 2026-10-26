let sdkPromise;

// 카카오맵 JavaScript SDK를 한 번만 불러온다.
export function loadKakaoMap() {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const key = import.meta.env.VITE_KAKAO_JS_KEY;
    if (!key) return reject(new Error("VITE_KAKAO_JS_KEY가 설정되지 않았습니다."));

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = () => reject(new Error("카카오맵 SDK를 불러오지 못했습니다."));
    document.head.appendChild(script);
  }).catch((e) => {
    sdkPromise = undefined; // 다음 시도에서 다시 불러올 수 있게 한다.
    throw e;
  });

  return sdkPromise;
}

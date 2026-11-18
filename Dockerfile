# ---------- 1단계: 빌드 ----------
FROM node:22-alpine AS build
WORKDIR /app

# 의존성 먼저 설치 (레이어 캐시 활용)
COPY package.json package-lock.json ./
RUN npm ci

# Vite 환경변수는 "빌드 시점"에 번들에 박히므로 build arg로 받는다.
# Railway는 Dockerfile에 선언된 ARG 이름과 같은 서비스 Variables를 자동으로 주입한다.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLIC_KEY
ARG VITE_KAKAO_JS_KEY
ARG VITE_KAKAO_REST_API_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_PUBLIC_KEY=$VITE_SUPABASE_PUBLIC_KEY \
    VITE_KAKAO_JS_KEY=$VITE_KAKAO_JS_KEY \
    VITE_KAKAO_REST_API_KEY=$VITE_KAKAO_REST_API_KEY

COPY . .
RUN npm run build

# ---------- 2단계: 서빙 ----------
FROM nginx:1.27-alpine

# nginx 공식 이미지는 /etc/nginx/templates/*.template 을 시작 시 envsubst 처리한다.
# Railway가 런타임에 넣어주는 $PORT 로 listen 하기 위함 (로컬 기본값 80).
ENV PORT=80
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

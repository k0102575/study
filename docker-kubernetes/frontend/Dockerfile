# Node.js 20 버전의 경량 Alpine 리눅스 이미지를 기반으로 사용
FROM node:20-alpine AS build
# 작업 디렉토리를 /app으로 설정
WORKDIR /app
# package.json, package-lock.json 파일을 컨테이너에 복사
COPY package*.json ./
# 의존성 설치
RUN npm install
# 나머지 소스코드 전체를 컨테이너에 복사
COPY . .
# React 앱을 빌드
RUN npm run build

# 실제 서비스용 경량 이미지로 이동
FROM node:20-alpine AS prod
# 작업 디렉토리를 /app으로 설정
WORKDIR /app
# 정적 파일 서빙을 위한 serve 패키지 전역 설치
RUN npm install -g serve
# 빌드된 정적 파일을 복사
COPY --from=build /app/build ./build
# 컨테이너의 80번 포트를 외부에 개방
EXPOSE 80
# 컨테이너 시작 시 정적 파일을 80번 포트로 서비스
CMD ["serve", "-s", "build", "-l", "80"] 
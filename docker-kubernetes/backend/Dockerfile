# Node.js 20 버전의 경량 Alpine 리눅스 이미지를 기반으로 사용
FROM node:20-alpine AS base

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# package.json, package-lock.json 파일을 컨테이너에 복사
COPY package*.json ./

# --- 프로덕션용 이미지 ---
# 프로덕션 환경에 필요한 의존성만 설치
FROM base AS prod
RUN npm install --production
# 전체 소스코드를 컨테이너에 복사
COPY . .
# 컨테이너의 3000번 포트를 외부에 개방
EXPOSE 3000
# Express 서버를 실행
CMD ["node", "src/index.js"]

# --- 개발(핫리로드)용 이미지 ---
# 개발 환경에 필요한 전체 의존성 설치 (devDependencies 포함)
FROM base AS dev
RUN npm install
# 전체 소스코드를 컨테이너에 복사
COPY . .
# 컨테이너의 3000번 포트를 외부에 개방
EXPOSE 3000
# nodemon으로 서버를 실행하여 소스코드 변경 시 자동 리로드
CMD ["npm", "run", "dev"] 
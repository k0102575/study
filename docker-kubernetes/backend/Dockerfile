# Node.js 20 버전의 경량 Alpine 리눅스 이미지를 기반으로 사용
FROM node:20-alpine
# 작업 디렉토리를 /app으로 설정
WORKDIR /app
# package.json, package-lock.json 파일을 컨테이너에 복사
COPY package*.json ./
# 의존성(프로덕션용) 설치
RUN npm install --production
# 나머지 소스코드 전체를 컨테이너에 복사
COPY . .
# 컨테이너의 3000번 포트를 외부에 개방
EXPOSE 3000
# 컨테이너 시작 시 실행할 명령(Express 서버 실행)
CMD ["node", "src/index.js"] 
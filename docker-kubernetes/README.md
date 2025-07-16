# 도커-쿠버네티스 스터디용 TODO 애플리케이션

- Express(backend)와 React(frontend) TODO 웹 애플리케이션
- Cursor ide 를 활용한 바이브 코딩

---

## 2단계: 도커 적용 후 실행 방법

1. backend 이미지 빌드 및 컨테이너 실행
   ```bash
   docker build -t todo-backend ./backend      # backend 폴더에서 Docker 이미지를 빌드 (이름: todo-backend)
   docker run -d --name todo-backend -p 3000:3000 todo-backend   # todo-backend 이미지를 3000번 포트로 컨테이너 실행
   ```
2. frontend 이미지 빌드 및 컨테이너 실행
   ```bash
   docker build -t todo-frontend ./frontend    # frontend 폴더에서 Docker 이미지를 빌드 (이름: todo-frontend)
   docker run -d --name todo-frontend -p 80:80 todo-frontend     # todo-frontend 이미지를 80번 포트로 컨테이너 실행
   ```
3. 브라우저에서 `http://localhost`로 접속하여 TODO 앱 확인

---

## 3단계: docker-compose + 핫리로드/볼륨 개발환경 실행 방법

1. docker-compose로 backend, frontend를 한 번에 실행 (핫리로드/볼륨 적용)
   ```bash
   docker-compose up --build   # backend, frontend를 동시에 빌드 및 실행 (소스코드 변경 시 자동 반영)
   ```
   - 백그라운드 실행: `docker-compose up -d --build`
   - 중지 및 정리: `docker-compose down`
2. 브라우저에서 `http://localhost`로 접속하여 TODO 앱 확인

- backend: nodemon, frontend: react-scripts 개발 서버로 소스코드 변경 시 자동 리로드
- 볼륨 마운트로 로컬 소스코드가 컨테이너에 실시간 반영됨

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

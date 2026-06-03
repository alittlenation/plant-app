# 식집사들

반려 식물 관리와 성장 기록을 위한 개인 기록 중심 MVP입니다.

## 프로젝트 구조

```text
frontend/  Expo + React Native + TypeScript + Expo Router + Zustand + React Query
backend/   Spring Boot + JPA + H2 local default + MySQL runtime driver
```

## MVP 포함 범위

- 식물 등록, 목록, 상세, 수정, 삭제
- 물주기, 영양제, 분갈이, 가지치기, 메모, 사용자 정의 기록
- 성장 사진 등록
- 식물 상세 화면 안의 성장 사진 타임라인
- S3 호환 presigned upload 흐름을 위한 백엔드 추상화

## 제외 범위

- Timeline 전용 화면
- Settings 화면
- 로그인/회원가입
- 커뮤니티, AI, 푸시 알림, 마켓, 결제

## 사전 준비

- Node.js 22 이상 권장
- npm 11 이상 권장
- Java 21
- Maven 3.9 이상

현재 backend는 Java 21 기준입니다. macOS에서 여러 Java 버전이 설치된 경우 아래처럼 Java 21을 명시해서 실행합니다.

```bash
JAVA_HOME=$(/usr/libexec/java_home -v 21) java -version
```

## 처음 clone 후 실행

```bash
git clone <repository-url>
cd plant-app
```

### 1. 환경변수 확인

루트의 `.env.example`을 참고합니다. 실제 비밀값은 `.env`, `frontend/.env` 등에만 두고 커밋하지 않습니다.

Frontend에서 기본 API 주소를 명시하려면:

```bash
cd frontend
cp ../.env.example .env
```

Expo는 `EXPO_PUBLIC_API_BASE_URL` 값을 사용합니다. 로컬 웹/시뮬레이터 기본값은 다음과 같습니다.

```text
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

실기기에서 Expo Go로 실행할 때는 `localhost` 대신 개발 머신의 LAN IP를 사용해야 합니다.

```text
EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:8080/api/v1
```

### 2. Backend 실행

```bash
cd backend
JAVA_HOME=$(/usr/libexec/java_home -v 21) mvn spring-boot:run
```

서버가 정상 기동되면 다음 API가 응답합니다.

```bash
curl http://localhost:8080/api/v1/plants
```

기본 DB는 인메모리 H2입니다. MySQL을 사용할 경우 로컬 환경에서 아래 값을 override합니다.

```bash
export SPRING_DATASOURCE_URL='jdbc:mysql://localhost:3306/sikjipsa'
export SPRING_DATASOURCE_USERNAME='your_username'
export SPRING_DATASOURCE_PASSWORD='your_password'
```

### 3. Frontend 실행

```bash
cd frontend
npm install
npm run web
```

Expo Go 또는 시뮬레이터로 실행하려면:

```bash
npm run start
```

## 검증 명령어

Backend:

```bash
cd backend
JAVA_HOME=$(/usr/libexec/java_home -v 21) mvn test
```

Frontend:

```bash
cd frontend
npm run typecheck
```

## 사진 업로드

개발 기본값은 MinIO 같은 S3 호환 스토리지 사용을 전제로 합니다.

- bucket: `sikjipsa-dev`
- public base URL: `http://localhost:9000/sikjipsa-dev`

현재 `LocalCompatibleStorageService`는 S3 호환 presigned URL 경계를 유지하는 개발용 구현입니다. 운영에서는 같은 `StorageService` 인터페이스로 AWS S3, Cloudflare R2, Supabase Storage 구현체를 교체하면 됩니다.

## 커밋 주의사항

- `.env`, `frontend/.env`, 실제 DB 비밀번호, 스토리지 access key/secret key는 커밋하지 않습니다.
- `frontend/node_modules/`, `frontend/.expo/`, `backend/target/`은 커밋하지 않습니다.
- `.env.example`에는 실제 비밀값이 아닌 예시 값만 둡니다.

# 식집사들

반려 식물 관리와 성장 기록을 위한 개인 기록 중심 MVP입니다.

## 구조

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

## 실행

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run start
```

Expo에서 API 주소가 필요하면 `EXPO_PUBLIC_API_BASE_URL`을 설정합니다.

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1 npm run start
```

실기기에서 실행할 때는 `localhost` 대신 개발 머신의 LAN IP를 사용해야 합니다.

## 사진 업로드

개발 기본값은 MinIO 같은 S3 호환 스토리지 사용을 전제로 합니다.

- bucket: `sikjipsa-dev`
- public base URL: `http://localhost:9000/sikjipsa-dev`

현재 `LocalCompatibleStorageService`는 S3 호환 presigned URL 경계를 유지하는 개발용 구현입니다. 운영에서는 같은 `StorageService` 인터페이스로 AWS S3, Cloudflare R2, Supabase Storage 구현체를 교체하면 됩니다.

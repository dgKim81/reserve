# exercise
 예약 관련해서 간단한 어플리케이션 작성.

# RFP
아래와 같이 요구사항을 띄웠다. 어째 일을 키우는 느낌이지만.. 일단 가보자...

## 공유 오피스 (주)둥지 웹 기반 예약 및 관리 시스템 구축 제안요청서

---

### 1. 제안요청 배경
공유 오피스 (주)둥지는 동동이 대표이사로 있는 회사로, 한 건물 내 여러 개의 방을 시간대별로 임대하며 고객들에게 유연하고 편리한 공간을 제공하고 있습니다. 현재 10개 규모의 방이 운영 중이며, 각 방은 상주 직원에 의해 관리되고 있습니다.

기존의 수기 및 부분적으로 운영되는 예약/관리 방식은 다음과 같은 어려움을 초래하고 있습니다:
- 예약 관리의 비효율성으로 인한 고객 응대 품질 저하
- 예약 현황 및 통계 데이터 관리의 복잡성
- 직원의 관리 업무 과중

이를 개선하기 위해 웹 기반의 예약 및 관리 시스템을 도입하여 효율적인 운영 환경과 고객 만족도를 제고하고자 합니다.

---

### 2. 프로젝트 목적
본 프로젝트의 목적은 공유 오피스 방 예약 및 관리 업무를 전산화하여 관리 효율성을 극대화하고, 사용자 편의성을 높이는 것입니다. 주요 목표는 다음과 같습니다:
- **고객의 온라인 예약 기능 제공**: 실시간 예약 현황 조회 및 예약 신청 가능
- **관리자의 업무 효율화**: 예약 현황 및 기록 조회, 데이터 통계 기능 제공
- **업무 프로세스 자동화**: 예약 알림, 시간대별 요금 계산 등 주요 기능 자동화

---

### 3. 요구사항

#### 3.1 기능적 요구사항
- **고객용 웹 인터페이스**
  - 실시간 예약 현황 조회
  - 시간대별 방 예약 신청
  - 예약 변경 및 취소 기능
  - 고객 알림 (예약 확인, 변경/취소 안내)
- **관리자용 웹 인터페이스**
  - 방 및 시간대별 예약 현황 관리
  - 예약 승인 및 변경
  - 고객 및 예약 데이터 관리
  - 예약 통계 및 보고서 생성
- **알림 및 통합 기능**
  - SMS/이메일 알림 기능
  - 시간대별 요금 자동 계산

#### 3.2 비기능적 요구사항
- **웹 표준 준수**: 다양한 브라우저 및 디바이스 호환성
- **보안**: 개인정보보호법 준수, 정보통신
- **확장성**: 추가 방 및 기능 확장 가능
- **성능**: 동시 접속 사용자 100명 이상 지원

---

### 4. 개발 및 구현 방안
- **개발 플랫폼**: NodeJs 기반의 백엔드와 React 또는 Vue.js 기반의 프론트엔드
- **데이터베이스**: MySQL 또는 PostgreSQL
- **호스팅 환경**: 클라우드 기반 (AWS, Azure 등)
- **통합 API**: SMS/이메일 알림 API, 결제 API (필요 시)

---

### 5. 예상 기대 효과
- **운영 효율성 향상**: 예약 관리 업무 단순화로 직원 업무 효율 증가
- **고객 만족도 향상**: 실시간 예약 및 알림 기능으로 고객 경험 개선
- **경영 데이터 활용**: 통계 및 보고서를 통한 의사결정 지원

---

### 6. 기대 협력 사항
- 운영 현황 및 요구사항 제공
- 테스트 사용자 그룹 지원
- 시스템 운영 초기 지원 및 피드백
- 
---

### 7. 문의
공유 오피스 (주)둥지  
담당자: 동동  
연락처: 010-0000-0000 
이메일: dgkim 


# design
 설계는 단계별로...

# apiServer
 백앤드는 원칙에 준해서 작업하기.


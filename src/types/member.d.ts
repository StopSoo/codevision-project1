export type MemberStore = {
    member: 'pharmacy' | 'wholesaler'; // 회원 분류
    isLogin: boolean; // 로그인 여부
    setLogin: () => void; // 로그인 상태로 변경하는 함수
    setLogout: () => void; // 로그아웃 상태로 변경하는 함수
    name: string; // 회원명
    setName: (memberName: string) => void; // 회원명을 변경하는 함수
}

export type ModalStore = {
    isModalOpen: boolean;
    setIsModalOpen: () => void;
    setIsModalClose: () => void;
}
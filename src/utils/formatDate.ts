// Date 변수를 화면에 표시될 날짜, 시간의 포맷으로 변경해주는 함수
export const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'Z');

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${period} ${displayHours}:${minutes}`;
}
// 두 날짜의 차이를 일로 계산해 반환하는 함수 
export const diffTime = (startDate: string, endDate: string) => {
    const diffTime = new Date(endDate).getTime() - new Date(startDate).getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays;
}
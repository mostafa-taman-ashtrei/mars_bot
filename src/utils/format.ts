const formatDate = (data: Date): string => data.toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
export default formatDate;

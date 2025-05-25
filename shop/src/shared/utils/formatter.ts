export const formatRemainingTime = (time?: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  if (hours > 0) return `${hours} ساعت و ${minutes} دقیقه`;
  return `${minutes} دقیقه`;
};

export const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

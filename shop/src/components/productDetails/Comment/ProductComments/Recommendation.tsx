import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

interface RecommendationProps {
  isRecommended: boolean;
}

const Recommendation = ({ isRecommended }: RecommendationProps) => {
  return (
    <div className={`flex items-center gap-x-2 ${isRecommended ? 'text-emerald-600' : 'text-red-500 dark:text-red-400'}`}>
      {isRecommended ? <AiOutlineLike className="h-5 w-5" /> : <AiOutlineDislike className="h-5 w-5" />}
      {isRecommended ? 'پیشنهاد میکنم' : 'پیشنهاد نمیکنم'}
    </div>
  );
};

export default Recommendation;

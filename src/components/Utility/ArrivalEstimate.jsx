import { format } from 'date-fns';

const ArrivalEstimate = () => {
  const calculateBusinessDaysFromToday = (days) => {
    const date = new Date();
    let remainingDays = days;

    while (remainingDays > 0) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        remainingDays--;
      }
    }

    return format(date, 'cccc,  LLLL do');
  };

  const estimatedDate = calculateBusinessDaysFromToday(4);

  return <span>{estimatedDate}</span>;
};

export default ArrivalEstimate;

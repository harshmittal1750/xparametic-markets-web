import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CarousalCardProps {
  questionId: number;
}

const CarousalCard: React.FC<CarousalCardProps> = ({ questionId }) => {
  const question = useSelector((state: RootState) => {
    const selectedQuestion = state.questions.questionsData.find(
      q => q.id === questionId
    );
    return selectedQuestion;
  });

  if (!question) {
    // Handle the case when the question is not found
    return null;
  }

  return (
    <Card sx={{ height: 330, width: 450, my: 2 }}>
      <CardMedia
        sx={{ height: 170 }}
        // image={question.imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {question.question}
        </Typography>{' '}
        <CardActions sx={{ px: 0 }}>
          <Button
            size="small"
            variant="outlined"
            sx={{ border: 1, borderColor: '#0ECB81' }}
          >
            Yes ${question.betValueYes}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ border: 1, borderColor: '#DC4155' }}
          >
            No ${question.betValueNo}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CarousalCard;

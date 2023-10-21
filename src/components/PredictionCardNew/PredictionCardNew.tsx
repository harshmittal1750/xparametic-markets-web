import { Card, CardContent, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

function PredictionCardNew() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Title Here
        </Typography>
        <Typography variant="body2">Some descriptive text here.</Typography>
        <Button endIcon={<ArrowForward />}>Read More</Button>
      </CardContent>
    </Card>
  );
}

export default PredictionCardNew;

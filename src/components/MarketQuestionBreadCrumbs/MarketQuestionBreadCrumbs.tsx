import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface LiquidityProps {
  questionId: number;
}
// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const MarketQuestionBreadCrumbs: React.FC<LiquidityProps> = ({
  questionId,
}) => {
  const question = useSelector((state: RootState) => {
    const selectedQuestion = state.questions.questionsData.find(
      (q) => q.id === questionId
    );
    return selectedQuestion;
  });

  if (!question) {
    // Handle the case when the question is not found
    return null;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography variant="subtitle2" textTransform={"uppercase"}>
        {question.category}
      </Typography>
      <Typography variant="subtitle1" textTransform={"uppercase"}>
        {question.subCategory}
      </Typography>
    </Breadcrumbs>
  );
};

export default MarketQuestionBreadCrumbs;

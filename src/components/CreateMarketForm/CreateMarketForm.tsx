import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';

import dayjs from 'dayjs';
import { Formik, Form } from 'formik';
import { almost } from 'helpers/math';
import sum from 'lodash/sum';
import { PolkamarketsService } from 'services';
import * as marketService from 'services/Polkamarkets/market';
import * as Yup from 'yup';

import { useNetwork } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

import { Button } from '../Button';
import Toast from '../Toast';
import ToastNotification from '../ToastNotification';
import CreateMarketFormActions from './CreateMarketFormActions';
import CreateMarketFormConfigure from './CreateMarketFormConfigure';
import CreateMarketFormFund from './CreateMarketFormFund';

type Outcome = {
  id: string;
  name: string;
  probability: number;
};

export type CreateMarketFormData = {
  question: string;
  outcomes: Outcome[];
  image: {
    file: any;
    hash: string;
    isUploaded: boolean;
  };
  category: string;
  subcategory: string;
  closingDate: string;
  liquidity: number;
  resolutionSource: string;
};

const initialData: CreateMarketFormData = {
  question: '',
  outcomes: [
    { id: uuid(), name: '', probability: 50 },
    { id: uuid(), name: '', probability: 50 }
  ],
  image: {
    file: undefined,
    hash: '',
    isUploaded: false
  },
  category: '',
  subcategory: '',
  closingDate: dayjs().toString(),
  liquidity: 0,
  resolutionSource: ''
};

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Market Question is required.'),
  image: Yup.object().shape({
    hash: Yup.string().required('Image is required.')
  }),
  outcomes: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Outcome name is required.'),
        probability: Yup.number()
          .moreThan(0, 'Probability must be greater than 0%.')
          .lessThan(100, 'Probability must be less than 100%.')
          .required('Probability is required.')
      })
    )
    .test('sum', 'Sum of probabilities must be 100%', (_value, context) => {
      const { outcomes } = context.parent;
      const probabilities = outcomes.map(outcome => outcome.probability);
      const sumOfProbabilities = sum(probabilities);
      return almost(sumOfProbabilities, 100);
    }),
  category: Yup.string().required('Category is required.'),
  subcategory: Yup.string().required('Subcategory is required.'),
  closingDate: Yup.date()
    .min(
      dayjs().format('MM/DD/YYYY HH:mm'),
      `Closing date must be later than ${dayjs().format('DD/MM/YYYY HH:mm')}`
    )
    .required('Closing date is required.'),
  liquidity: Yup.number().moreThan(0).required('Liquidity is required.'),
  resolutionSource: Yup.string()
    .url('Please enter a valid url.')
    .required('Resolution source is required.')
});

function CreateMarketForm() {
  const history = useHistory();
  const { networkConfig } = useNetwork();
  const { show, close } = useToastNotification();

  function redirectToHomePage() {
    return history.push('/');
  }

  function redirectToMarketPage(marketSlug) {
    return history.push(`/markets/${marketSlug}`);
  }

  async function handleFormSubmit(values: CreateMarketFormData) {
    const polkamarketsService = new PolkamarketsService(networkConfig);
    const closingDate = new Date(values.closingDate).getTime() / 1000; // TODO: move to dayjs

    const outcomes = values.outcomes.map(outcome => outcome.name);
    const odds = values.outcomes.map(outcome => outcome.probability);

    // data format: "category;subcategory;resolutionSource"
    const data = `${values.category};${values.subcategory};${values.resolutionSource}`;

    const response = await polkamarketsService.createMarket(
      values.question,
      values.image.hash,
      closingDate,
      outcomes,
      data,
      values.liquidity,
      odds
    );

    show('createMarket');

    const { marketId } = response.events.MarketCreated.returnValues;

    try {
      const res = await marketService.createMarket(
        marketId,
        networkConfig.NETWORK_ID
      );
      redirectToMarketPage(res.data.slug);
    } catch (err) {
      redirectToHomePage();
    }
  }

  return (
    <>
      <ToastNotification id="createMarket" duration={10000}>
        <Toast
          variant="success"
          title="Success"
          description="Market successfuly created!"
        >
          <Toast.Actions>
            <Button
              size="sm"
              variant="subtle"
              onClick={() => close('createMarket')}
            >
              Dismiss
            </Button>
          </Toast.Actions>
        </Toast>
      </ToastNotification>
      <Formik
        initialValues={initialData}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          await handleFormSubmit(values);
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        <Form className="pm-c-create-market-form">
          <CreateMarketFormConfigure />
          <CreateMarketFormFund />
          <CreateMarketFormActions />
        </Form>
      </Formik>
    </>
  );
}

export default CreateMarketForm;

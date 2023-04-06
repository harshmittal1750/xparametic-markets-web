import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { PolkamarketsService } from 'services';
import * as marketService from 'services/Polkamarkets/market';
import { Token } from 'types/token';

import { useNetwork, useAppSelector } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

import { Button } from '../Button';
import CreateMarketFormDetails from '../CreateMarketFormDetails';
import Toast from '../Toast';
import ToastNotification from '../ToastNotification';
import type { CreateMarketFormData } from './CreateMarketForm.type';
import CreateMarketFormActions from './CreateMarketFormActions';
import CreateMarketFormFund from './CreateMarketFormFund';
import { initialValues, validationSchema } from './CreateMarktForm.util';

function CreateMarketForm() {
  const history = useHistory();
  const { network, networkConfig } = useNetwork();
  const { show, close } = useToastNotification();
  const { createMarketToken } = useAppSelector(state => state.polkamarkets);
  const handleFormRef = useCallback(
    (hasError: boolean) => (node: HTMLFormElement | null) =>
      hasError && node?.scrollIntoView(),
    []
  );

  async function handleFormSubmit(values: CreateMarketFormData) {
    const polkamarketsService = new PolkamarketsService(networkConfig);
    const closingDate = new Date(values.closingDate).getTime() / 1000; // TODO: move to dayjs
    let wrapped = false;
    let token = '';

    // fetching token address
    if (createMarketToken && (createMarketToken as Token).addresses) {
      token = (createMarketToken as Token).addresses[network.key];
    } else {
      wrapped = true;
    }

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
      odds,
      token,
      wrapped
    );

    show('createMarket');

    const { marketId } = response.events.MarketCreated.returnValues;

    try {
      const res = await marketService.createMarket(
        marketId,
        networkConfig.NETWORK_ID
      );

      history.push(`/markets/${res.data.slug}`);
    } catch (err) {
      history.push('/');
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
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          await handleFormSubmit(values);
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {values => (
          <Form
            ref={handleFormRef(values.isSubmitting && !values.isValid)}
            className="pm-c-create-market-form"
          >
            <CreateMarketFormDetails />
            <CreateMarketFormFund />
            <CreateMarketFormActions />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateMarketForm;

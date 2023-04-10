import CreateMarketFormOutcomes from '../CreateMarketFormOutcomes';
import { Input, ImageUploadInput, SelectInput, DateInput } from '../Input';
import Text from '../Text';

function CreateMarketFormConfigure() {
  return (
    <div className="pm-c-create-market-form__card">
      <Text
        as="h5"
        scale="body"
        fontWeight="medium"
        className="pm-c-create-market-form__card-title"
      >
        Market Details
      </Text>
      <Input
        name="question"
        label="Question"
        placeholder="What would you like to see the world predict?"
      />
      <CreateMarketFormOutcomes />
      <ImageUploadInput
        label="Market Thumbnail"
        name="image"
        notUploadedActionLabel="Select Image"
        uploadedActionLabel="Re-Upload"
      />
      <div className="pm-c-create-market-form__card-categories-group--row">
        <SelectInput
          label="Category"
          name="category"
          placeholder="Select Category"
          options={[
            {
              name: 'Crypto',
              value: 'crypto'
            },
            {
              name: 'Gaming',
              value: 'gaming'
            },
            {
              name: 'Sports',
              value: 'sports'
            },
            {
              name: 'Politics',
              value: 'politics'
            },
            {
              name: 'Other',
              value: 'other'
            }
          ]}
        />
        <Input
          label="Subcategory"
          name="subcategory"
          placeholder="Subcategory"
        />
      </div>
      <Input
        name="resolutionSource"
        label="Resolution Source"
        placeholder="https://www.google.com/"
      />
      <DateInput label="Closing Date - Local Time" name="closingDate" />
    </div>
  );
}

export default CreateMarketFormConfigure;

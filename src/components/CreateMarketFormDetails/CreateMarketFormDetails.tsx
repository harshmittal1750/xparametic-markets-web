import {
  Input,
  ImageUploadInput,
  SelectInput,
  DateInput,
  TextArea
} from '../Input';
import CreateMarketFormDetailsClasses from './CreateMarketFormDetails.module.scss';

function CreateMarketFormDetails() {
  return (
    <div className={CreateMarketFormDetailsClasses.root}>
      <Input
        name="question"
        label="Question"
        placeholder="What would you like to see the world predict?"
        description="eg: Will the Democracts win the 2024 US presidential election?"
      />
      <TextArea
        rows={5}
        name="description"
        label="Description"
        placeholder="Write the market details here"
        description="Provide background info and market resolution criteria here."
        className={CreateMarketFormDetailsClasses.textArea}
      />
      <div className={CreateMarketFormDetailsClasses.groupRow}>
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
        <SelectInput
          label="Subcategory"
          name="subcategory"
          placeholder="Select Subcategory"
          options={[
            {
              name: 'Society',
              value: 'society'
            },
            {
              name: 'Economy/Finance',
              value: 'economy/finance'
            },
            {
              name: 'Politics',
              value: 'politics'
            },
            {
              name: 'Entertainment/Arts',
              value: 'entertainment/arts'
            },
            {
              name: 'Sports',
              value: 'sports'
            },
            {
              name: 'Other',
              value: 'other'
            }
          ]}
        />
      </div>
      <Input
        name="resolutionSource"
        label="Resolution Source"
        placeholder="https://www.google.com/"
      />
      <div className={CreateMarketFormDetailsClasses.groupRow}>
        <DateInput label="Closing Date - Local Time" name="closingDate" />
        <ImageUploadInput
          label="Thumbnail"
          name="image"
          notUploadedActionLabel="Upload Image"
          uploadedActionLabel="Re-Upload"
        />
      </div>
    </div>
  );
}

export default CreateMarketFormDetails;

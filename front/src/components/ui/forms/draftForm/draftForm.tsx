import { Formik } from 'formik';
import '../../../../scss/components/ui/authForms/authForms.scss';
import { schemaDraft } from '../../../../utils/yup/schemas';
import DraftFormContent from './draftFormContent';
import { useDraftForm } from '../../../../hooks/content/useDraftForm';
import { OriginalContentInterface } from '../../../../interfaces/originalContent';
import { NftInterface } from '../../../../interfaces/nftData';
interface Props {
  originalContentData: OriginalContentInterface | null;
  draftNftData: NftInterface | null;
}

const determineInitialValues = ({
  originalContentData,
  draftNftData,
}: Props) => ({
  title: draftNftData?.title || '',
  description: draftNftData?.description || '',
  hashtags: draftNftData?.hashtags || [],
  mediaUrl: originalContentData?.url || draftNftData?.mediaUrl || '',
  location: draftNftData?.location || '',
  pathFirebase: originalContentData?.path || draftNftData?.pathFirebase || '',
  isDraft: true,
});

export default function DraftForm({
  originalContentData,
  draftNftData,
}: Props) {
  const { handleCreateDraft, handleUpdateDraft } = useDraftForm();

  let handleSubmit = handleCreateDraft;
  if (draftNftData) {
    handleSubmit = handleUpdateDraft;
  }

  const initialValues = determineInitialValues({
    originalContentData,
    draftNftData,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemaDraft}
      onSubmit={handleSubmit}
    >
      {({ status, setFieldValue }) => (
        <DraftFormContent
          {...status}
          setFieldValue={setFieldValue}
          initialHashtags={initialValues.hashtags}
          initialLocation={initialValues.location}
        />
      )}
    </Formik>
  );
}

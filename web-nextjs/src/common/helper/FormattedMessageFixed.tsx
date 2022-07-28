import { FormattedMessage } from 'react-intl'

interface FormattedMessageFixedProps {
  id: string
  defaultMessage: string
  description?: string
}
export function FormattedMessageFixed(props: FormattedMessageFixedProps): any {
  return <FormattedMessage {...props} />
}

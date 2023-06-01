import { Alert } from "@mui/material";

interface Props {
  error: string | undefined;
}

const Error = ({ error }: Props) => {
  if (!error) return null;

  return (
    <Alert severity="info">{error}</Alert>
  );
};

export default Error;
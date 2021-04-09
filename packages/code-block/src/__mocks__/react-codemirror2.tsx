import React from "react";

type UncontrollerProps = {
  value: string;
};

export const UnControlled = ({ value }: UncontrollerProps): JSX.Element => (
  // Usiong aria-details here so no formatting is done on the value.
  <pre aria-details={value} />
);

export default UnControlled;

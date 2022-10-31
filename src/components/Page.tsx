import React from 'react';

type Props = {
  children: JSX.Element;
};

const Page = ({ children }: Props) => {
  return <div className="max-w-screen-xl mx-auto mt-4 md:px-4">{children}</div>;
};

export default Page;

"use client"


type projectParamProps = {
  params: {
    id: string;
  };
};
function page({ params }: projectParamProps) {
  const { id } = params;
  

  return (
   <div>{id}</div>
  );
}

export default page
import Link from 'next/link';
import React from 'react'

declare type OrganizationCardProps={
    organizationName:string;
    id:string;
}

function OrganizationCard({organizationName,id}:OrganizationCardProps) {
  return (
    <div>
    <Link href={`/organizations/${id}`}>
        {organizationName}
    </Link>
    </div>
  )
}

export default OrganizationCard
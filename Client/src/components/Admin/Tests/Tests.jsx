import { useState } from 'react';

import { createColumnHelper, tableFeatures } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query'

import api from '../../../api/api.js'

import DataTable from '../Table/DataTable.jsx';
import PageHeader from '../PageHeader/PageHeader.jsx';


const features = tableFeatures({});
const columnHelper = createColumnHelper()

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Test Name' }),
  columnHelper.accessor('price', { header: 'Price' }),
  columnHelper.accessor('offerPrice', { header: 'Offer-price' }),
  columnHelper.accessor('category', { header: 'Category' }),
  columnHelper.accessor('relevance', { header: 'Relevance' }),
  columnHelper.accessor('preparation', { header: 'Preparation' }),
  columnHelper.accessor('isPopular', { header: 'Popular' }),
]);


export default function Tests() {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const allTests = async () => {
    const res = await api.get('/tests/all')
    return res.data.data.allTests
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['tests'],
    queryFn: allTests
  })

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 lg:p-8">

      <PageHeader
        title={'Tests'}
        subtitle={'Manage all diagnostic tests offered at the centre.'}
        search={search}
        setSearch={setSearch}
        placeholder={'Search Tests'}
        category={category}
        setCategory={setCategory}
        addLink={'/admin/tests/add'}
        addBtn={'Add Test'}
      />

      <DataTable
        data={data}
        columns={columns}
        features={features}
      />
    </div>
  )
}

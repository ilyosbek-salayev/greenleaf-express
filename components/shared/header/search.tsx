import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { getAllCategories } from '@/lib/actions/product.actions'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'

export default async function Search() {
  const {
    site: { name },
  } = await getSetting()
  const categories = await getAllCategories()

  const t = await getTranslations()
  return (
    <form action='/search' method='GET' className='flex flex-wrap md:flex-nowrap items-stretch h-10 w-full'>
      <Select name='category'>
        <SelectTrigger className='w-full md:w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-md md:rounded-r-none md:rounded-l-md rtl:rounded-r-md rtl:rounded-l-none'>
          <SelectValue placeholder={t('Header.All')} />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='all'>{t('Header.All')}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full w-full md:w-auto'
        placeholder={t('Header.Search Site', { name })}
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground text-black rounded-md md:rounded-s-none md:rounded-e-md h-full w-full md:w-auto px-3 py-2 flex items-center justify-center'
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}

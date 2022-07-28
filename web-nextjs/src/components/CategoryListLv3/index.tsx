import { Button } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import React from 'react'

const lang = 'vi'

interface ItemProps {
  id: number
  name: string
  setActiveCategoryLv3: any
  isSelected: boolean
  setCategoryLevel: any
}

const CategoryItemLv3 = (props: ItemProps) => {
  const { id, name, isSelected, setActiveCategoryLv3, setCategoryLevel } = props

  return (
    <Button
      colorScheme='teal'
      variant={isSelected ? 'outline' : 'ghost'}
      borderRadius='12px'
      textColor={isSelected ? '#000000b0' : '#000'}
      mb='0.5rem'
      mr='0.5rem'
      p='0.5rem'
      onClick={() => {
        setActiveCategoryLv3(id)
        setCategoryLevel(3)
      }}
      bg={isSelected ? '#E6FFFA' : 'none'}
    >
      {name}
    </Button>
  )
}

interface ListProps {
  setActiveCategoryLv3: any
  activeCategoryLv3: any
  categoryListLv3: any
  setCategoryLevel: any
}

function CategoryListLv3(props: ListProps) {
  const { setCategoryLevel, setActiveCategoryLv3, activeCategoryLv3, categoryListLv3 } = props

  return (
    <>
      <Swiper spaceBetween={13.08} slidesPerView='auto' style={{ padding: '1rem 0' }}>
        {categoryListLv3?.map((item: any) => (
          <SwiperSlide key={item.id} style={{ width: 'auto', marginRight: '50px' }}>
            <CategoryItemLv3
              id={item?.id}
              name={item?.name?.[lang]}
              isSelected={item.id === activeCategoryLv3}
              {...{ setActiveCategoryLv3, setCategoryLevel }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <ProductByCategory pickedCate={activeSubCategory} /> */}
    </>
  )
}

export default CategoryListLv3

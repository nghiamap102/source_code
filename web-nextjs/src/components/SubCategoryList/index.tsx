import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

import React from 'react'

import SubCategoryItem from './SubCategoryItem'
import { useLangSwitch } from 'src/common/hooks/use-lang'

interface Props {
  activeCategory: { child: [] }
  setActiveSubCategory: any
  activeSubCategory: any
  setCategoryLevel: any
  setCategoryListLv3: any
  allCategoryLv3: any
}

function SubCategoryList(props: Props) {
  const { activeCategory, setActiveSubCategory, activeSubCategory, setCategoryLevel } = props
  const subCategories = activeCategory.child
  const { lang } = useLangSwitch()
  return (
    <>
      <Swiper
        // modules={[Navigation]}
        // navigation
        spaceBetween={13.08}
        slidesPerView='auto'
        style={{ padding: '1rem 0' }}
      >
        {subCategories.map((item: any) => (
          <SwiperSlide key={item.id} style={{ width: 'auto', marginRight: '50px' }}>
            <SubCategoryItem
              id={item?.id}
              name={item?.name?.[lang]}
              isSelected={item.id === activeSubCategory}
              {...{ setActiveSubCategory, setCategoryLevel }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <ProductByCategory pickedCate={activeSubCategory} /> */}
    </>
  )
}

export default SubCategoryList

import { Skeleton, Box, Image } from '@chakra-ui/react'
import React, { FC } from 'react'

interface Props {
  bannerUrl: string
}

const Banner: FC<Props> = ({ bannerUrl }) => {
  return (
    <Skeleton isLoaded={Boolean(bannerUrl)} mt='61px'>
      <Box pos='relative' height='301px'>
        <Image boxSize='100%' objectFit='cover' src={bannerUrl} alt='banner' />
        {/* <Box
            pos="absolute"
            width="50%"
            height="100%"
            top="0"
            bg="linear-gradient(90deg, rgba(219, 160, 12, 0.69) 46.75%, rgba(255, 203, 71, 0) 86.56%);
        "
          >
            <Box width="80%" verticalAlign="middle" mx="auto" pt="20px">
              <Heading as="h1" fontSize="52px" color="#fff">
                Thực phẩm tươi cho bữa ăn dinh dưỡng
              </Heading>
              <Button
                mt="30px"
                width="148px"
                bgColor="#FFCB47
        "
              >
                Mua ngay
              </Button>
            </Box>
          </Box> */}
      </Box>
    </Skeleton>
  )
}

export default Banner

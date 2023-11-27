"use client";
import { HStack, VStack } from "@/components/common/Stack";
import { Typography } from "@/components/common/Typography";
import { useGetUserDetail } from "@/hook/react-query/user/useGetUserDetail";
import useUserID from "@/hook/useUser";

import tw from "twin.macro";

export default function Profile() {
  const userId = useUserID();
  const { data: userDetail } = useGetUserDetail(userId, {
    enabled: userId > 0,
  });
  return (
    <HStack className="w-full px-16 py-24 border-t-1 border-b-1 border-grey-50">
      <HStack className="items-center gap-20">
        <div className="h-52 w-52 rounded-52 bg-grey-50"></div>
        <Typography twStyle={tw`title_body`}>
          {userDetail?.data.nickname}
        </Typography>
      </HStack>
    </HStack>
  );
}

"use client";
import Rect from "@/components/Rect";
import Sampling from "@/components/Sampling";
import Wave from "@/components/Wave";
import * as S from "./Page.styles";

export default function page() {
	return (
		<S.PageContainer>
			<Wave />
			<Sampling />
			<Rect />
		</S.PageContainer>
	);
}

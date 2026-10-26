-- 1. 프랜차이즈 등록
INSERT INTO franchise (name) VALUES ('투썸플레이스');

-- 2. 커피 데이터 삽입
INSERT INTO coffee (name, price, intro, caffeine, saturated_fat, sugar, natrium, protein, img, franchise_id)
SELECT v.name, v.price, v.intro, v.caffeine, v.saturated_fat, v.sugar, v.natrium, v.protein, v.img,
       (SELECT id FROM franchise WHERE name = '투썸플레이스')
FROM (VALUES
('레몬 커피', 5200, '레몬의 상큼함과 아메리카노의 깔끔함을 담아 산뜻하게 즐기는 투썸 레몬 커피', 186, 0, 13, 5, 1, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193680_01_01_20260727014025.png'),
('레몬 카페 라떼', 5700, '상큼한 레몬과 고소한 카페 라떼의 조화 부드럽고 산뜻하게 즐기는 투썸 레몬 카페 라떼', 186, 2.8, 17, 55, 4, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193681_01_01_20260727014738.png'),
('하프 카페인 콜드브루 라떼', 5900, '콜드브루와 디카페인 콜드브루를 1:1로 블렌딩해 카페인은 반으로, 부드러움은 그대로 살린 하프 카페인 콜드브루 라떼', 106, 2.9, 5, 65, 4, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193641_01_01_20260708015307.jpg'),
('하프 카페인 콜드브루', 5400, '콜드브루와 디카페인 콜드브루를 1:1로 블렌딩해 카페인은 반으로, 깊은 풍미는 그대로 살린 하프 카페인 콜드브루', 106, 0, 0, 20, 0.99, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193640_01_01_20260708015301.jpg'),
('우베 카페 라떼 (아이스)', 6500, '보랏빛 우베 라떼에 진한 에스프레소를 더해한층 풍부하게 즐기는 우베 카페 라떼', 93, 4, 24, 85, 4, 'https://mcdn.twosome.co.kr/upload/MOMG0030/202603/MOMG0030_20260330134430_MZwiaFpJ'),
('생크림 말차 카페 라떼 (핫)', 5800, '우유의 고소함을 담은 생크림을 올려 말차와 에스프레소의 조화로운 밸런스를 느낄 수 있는 말차 카페 라떼', 210, 10, 27, 110, 9, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193208_01_01_20260226062332.jpg'),
('생크림 말차 카페 라떼 (아이스)', 5800, '우유의 고소함을 담은 생크림을 올려 말차와 에스프레소의 조화로운 밸런스를 느낄 수 있는 말차 카페 라떼', 200, 11, 24, 85, 7, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193208_01_01_20260226062332.jpg'),
('생크림 카페 라떼 (핫)', 5700, '우유의 고소함을 담은 생크림을 올린 풍부한 바디감의 카페 라떼', 186, 6, 24, 100, 8, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193207_01_01_20260226092515.jpg'),
('생크림 카페 라떼 (아이스)', 5700, '우유의 고소함을 담은 생크림을 올린 풍부한 바디감의 카페 라떼', 186, 13, 18, 65, 5, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193207_01_01_20260226092515.jpg'),
('아메리카노 (핫)', 4700, '진하게 로스팅한 커피 원두에서 에스프레소를 추출하여 투썸 고유의 원두 풍미를 느낄 수 있는 에스프레소 음료', 186, 0, 0, 8, 0.99, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10100001_01_01_20260608052208.jpg'),
('아메리카노 (아이스)', 4700, '진하게 로스팅한 커피 원두에서 에스프레소를 추출하여 투썸 고유의 원두 풍미를 느낄 수 있는 에스프레소 음료', 186, 0, 0, 9, 1, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10100001_01_01_20260608052208.jpg'),
('카페 라떼 (핫)', 5200, '풍부하고 진한 농도의 에스프레소와 스팀밀크 위에 부드러운 우유 거품을 살짝 올려준 에스프레소 음료', 186, 6, 12, 100, 9, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10100002_01_01_20260608055115.jpg'),
('카페 라떼 (아이스)', 5200, '풍부하고 진한 농도의 에스프레소와 스팀밀크 위에 부드러운 우유 거품을 살짝 올려준 에스프레소 음료', 186, 3.8, 7, 55, 5, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10100002_01_01_20260608055115.jpg'),
('디카페인 민트 밀샷추', 6200, '카페인이 없는 루이보스 밀크티에 청량한 민트향과 디카페인 샷을 더해 즐기는 투썸 밀샷추', 6, 3.4, 18, 60, 5, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193562_01_01_20260528063555.jpg'),
('디카페인 밀샷추', 6200, '카페인이 없는 루이보스 밀크티에 디카페인 샷을 더해 은은한 풍미가 어우러진 투썸 밀샷추', 6, 3.4, 19, 55, 5, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193561_01_01_20260528063448.jpg'),
('레몬 아샷추 MAX', 5700, '상큼한 레몬 아이스티에 에스프레소를 더해 향긋하게 즐기는 투썸 아샷추', 93, 0, 34, 15, 0.99, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10191951_01_01_20240618085900.jpg'),
('피치 아샷추 MAX', 5700, '달콤하고 향긋한 복숭아 아이스티에 에스프레소를 더해 달콤하게 즐기는 투썸 아샷추', 93, 0, 35, 30, 0.99, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10191950_01_01_20250901102211.jpg'),
('생크림 아메리카노 (핫)', 5200, '우유의 고소함을 담은 생크림과 은은한 바닐라 향이 어우러져 크리미한 매력이 더해진 아메리카노', 186, 7, 21, 25, 2, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193206_01_01_20260226093042.jpg'),
('생크림 아메리카노 (아이스)', 5200, '우유의 고소함을 담은 생크림과 은은한 바닐라 향이 어우러져 크리미한 매력이 더해진 아메리카노', 186, 9, 19, 25, 2, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10193206_01_01_20260226093042.jpg'),
('디카페인 콜드브루 라떼', 5900, '고소한 우유와 함께 즐기는 깔끔한 맛 디카페인 콜드브루의 밸런스가 느껴지는 아이스 음료', 13, 4, 4, 70, 4, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10192140_01_01_20250711110253.jpg'),
('바닐라빈 라떼 (핫)', 6000, '바닐라빈을 넣어 더 깊고 달콤하게 즐기는 에스프레소 라떼', 186, 9, 27, 165, 9, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10192139_01_01_20250711105917.jpg'),
('바닐라빈 라떼 (아이스)', 6000, '바닐라빈을 넣어 더 깊고 달콤하게 즐기는 에스프레소 라떼', 186, 7, 26, 150, 7, 'https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10192139_01_01_20250711105917.jpg'),
('카푸치노', 5200, '풍부하고 진한 농도의 에스프레소 위에 스팀밀크와 부드럽고 풍부한 양의 우유거품을 올린 에스프레소 음료', 186, 4, 9, 75, 6, 'https://mcdn.twosome.co.kr/menu_image/P
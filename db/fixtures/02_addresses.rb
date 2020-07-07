Address.seed do |s|
  s.id = 1
  s.prefecture = '東京都'
  s.city = '渋谷区'
  s.customer_id = Customer.first.id
end

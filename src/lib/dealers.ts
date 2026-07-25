export interface Dealer {
  id: string;
  name: string;
  type: 'Regional Depot' | 'Authorized Stockist' | 'Express Outlet';
  city: string;
  state: string;
  pincode: string;
  address: string;
  phone: string;
  email: string;
  distance_km: number;
  lat: number;
  lng: number;
  services: string[];
  is_open_now: boolean;
}

export const INITIAL_DEALERS: Dealer[] = [
  {
    id: 'dealer-hyd-hq',
    name: 'PetroBazaar Headquarters & Central Depot',
    type: 'Regional Depot',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    address: 'Plot 45, Industrial Development Area, Nacharam, Hyderabad',
    phone: '+91 93966 28880',
    email: 'srinivas@petrobazaar.com',
    distance_km: 2.4,
    lat: 17.4399,
    lng: 78.5482,
    services: ['Bulk Tanker Dispatch (FO/LDO)', 'Bitumen VG-30 Drums', 'HP/Servo Engine Oil Wholesale'],
    is_open_now: true
  },
  {
    id: 'dealer-pune-midc',
    name: 'Lubeswala West India Hub & MIDC Depot',
    type: 'Regional Depot',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411018',
    address: 'Block W-12, Bhosari MIDC Industrial Zone, Pune',
    phone: '+91 98765 43210',
    email: 'pune.depot@petrobazaar.com',
    distance_km: 5.1,
    lat: 18.6298,
    lng: 73.8477,
    services: ['Furnace Oil FO 180', 'LDO Tanker Trucking', 'Pyrolysis Oil Bulk'],
    is_open_now: true
  },
  {
    id: 'dealer-mum-bhiwandi',
    name: 'PetroBazaar Mumbai Logistics Hub',
    type: 'Authorized Stockist',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '421302',
    address: 'Unit 8, Indian Corporation Logistics Park, Bhiwandi, Thane',
    phone: '+91 98230 11223',
    email: 'mumbai.sales@petrobazaar.com',
    distance_km: 8.7,
    lat: 19.2967,
    lng: 73.0628,
    services: ['Bitumen Drums & Tankers', 'Servo/HP Lubes Wholesale', 'Same-Day Dispatch'],
    is_open_now: true
  },
  {
    id: 'dealer-ahmedabad-sanand',
    name: 'Gujarat Industrial Fuel & Lubricant Depot',
    type: 'Regional Depot',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382110',
    address: 'Gate 2, GIDC Engineering Zone, Sanand, Ahmedabad',
    phone: '+91 97129 44556',
    email: 'gujarat@petrobazaar.com',
    distance_km: 12.3,
    lat: 22.9904,
    lng: 72.3804,
    services: ['Furnace Oil FO 180', 'Low Viscosity Fuel Oil (LVFO)', 'Plastic Pyrolysis Oil'],
    is_open_now: true
  },
  {
    id: 'dealer-chennai-[#0A4D8C]',
    name: 'Chennai Port & South Logistics Hub',
    type: 'Authorized Stockist',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600058',
    address: 'Phase III, Ambattur Industrial Estate, Chennai',
    phone: '+91 94440 88990',
    email: 'chennai@petrobazaar.com',
    distance_km: 15.6,
    lat: 13.1147,
    lng: 80.1548,
    services: ['Marine Lubricants', 'Diesel Engine Oil Buckets', 'Hydraulic Brake Fluids'],
    is_open_now: true
  },
  {
    id: 'dealer-[#0A4D8C]-express',
    name: 'Lubeswala Express Workshop Depot',
    type: 'Express Outlet',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500037',
    address: 'Shop 14, Auto Nagar Main Road, Balanagar, Hyderabad',
    phone: '+91 91234 56789',
    email: 'express.balanagar@petrobazaar.com',
    distance_km: 3.8,
    lat: 17.4697,
    lng: 78.4419,
    services: ['45-Min Express Pickup', 'Engine Oil Pails (15L)', 'Grease & Coolants'],
    is_open_now: true
  }
];

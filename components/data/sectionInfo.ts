
export interface SectionInfo {
  id: string;
  title: string;
  description: string;
}

export const sectionExplanations: SectionInfo[] = [
  {
    id: 'A',
    title: 'General Home Information',
    description: 'Understanding the age, occupancy, and history of a home helps identify baseline risks. Older homes may contain lead or asbestos, while recent renovations can release VOCs. High occupancy increases CO2 levels and moisture load.'
  },
  {
    id: 'B',
    title: 'HVAC & Furnace Systems',
    description: 'Your heating and cooling system is the "lungs" of your home. Dirty coils, infrequent filter changes, uncleaned air ducts, or general lack of maintenance can circulate dust, mold spores, and allergens throughout every room. Proper filtration and duct maintenance are your first lines of defense.'
  },
  {
    id: 'C',
    title: 'Ventilation & Airflow',
    description: 'Modern homes are built tight to save energy, which traps pollutants inside. Mechanical ventilation (like ERVs or exhaust fans) is critical to flush out stale, contaminated air and replace it with fresh outdoor air.'
  },
  {
    id: 'D',
    title: 'Humidity & Moisture Control',
    description: 'Mold requires moisture to grow. Keeping indoor humidity below 60% inhibits mold growth and dust mite proliferation. Basements are particularly vulnerable due to their cool surfaces and proximity to soil moisture.'
  },
  {
    id: 'E',
    title: 'Water Intrusion & Mold Risk',
    description: 'Past leaks or floods often leave behind hidden moisture in walls or under floors, creating a breeding ground for mold. Even minor ongoing leaks can lead to significant structural and air quality damage over time.'
  },
  {
    id: 'F',
    title: 'Cleaning Habits',
    description: 'While cleaning removes dust, the chemicals used can be harmful. Harsh cleaners introduce VOCs, and standard vacuums often recirculate fine dust. HEPA vacuums and natural cleaners reduce this chemical and particulate burden.'
  },
  {
    id: 'G',
    title: 'VOC & Chemical Exposure',
    description: 'Volatile Organic Compounds (VOCs) off-gas from new furniture, paint, and flooring. These invisible chemicals can cause headaches and respiratory irritation. attached garages can also leak carbon monoxide and benzene into living spaces.'
  },
  {
    id: 'H',
    title: 'Pets & Biologicals',
    description: 'Pet dander is a potent allergen that sticks to surfaces and stays airborne for hours. Pests like rodents or cockroaches leave droppings that degrade into microscopic allergens, triggering asthma and immune responses.'
  },
  {
    id: 'I',
    title: 'Indoor Activities',
    description: 'Combustion from candles, fireplaces, or gas stoves releases soot (PM2.5) and gases. Without proper venting, these everyday activities can spike indoor pollution levels higher than a busy street corner.'
  },
  {
    id: 'J',
    title: 'Basement, Crawlspace & Foundation',
    description: 'The "stack effect" pulls air from your basement up into the living areas. A damp, unsealed crawlspace or basement means you are breathing that ground moisture and soil gas (like Radon) on the upper floors.'
  },
  {
    id: 'K',
    title: 'Odors & Health Indicators',
    description: 'Persistent odors are often the only warning sign of hidden mold or chemical issues. If health symptoms improve when you leave the house ("Sick Building Syndrome"), it is a strong indicator that the home environment is the cause.'
  },
  {
    id: 'L',
    title: 'Home Usage & Special Situations',
    description: 'Lifestyle choices, such as storing cardboard (mold food) in damp areas or drying clothes indoors, add unnecessary moisture and dust. Radon and Ozone machines are specific, invisible hazards that require targeted testing.'
  },
  {
    id: 'M',
    title: 'Final Environmental Indicators',
    description: 'Visible dust accumulation, static shocks, and drafty windows are physical clues about your home\'s performance. They indicate issues with filtration, humidity control, and building envelope integrity.'
  }
];

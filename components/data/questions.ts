
import { Question } from '@/lib/types';

export const questions: Question[] = [
  // --- SECTION A: General Home Information ---
  {
    id: 'a_tenure',
    category: 'A. General Home Information',
    text: 'How long have you lived in the home?',
    options: [
      { label: 'Less than 1 year', value: '<1' },
      { label: '1 - 5 years', value: '1-5' },
      { label: '5 - 10 years', value: '5-10' },
      { label: 'More than 10 years', value: '>10' }
    ]
  },
  {
    id: 'a_home_age',
    category: 'A. General Home Information',
    text: 'How old is the home?',
    options: [
      { label: 'New Construction (< 5 years)', value: 'new' },
      { label: '5 - 20 years', value: 'modern' },
      { label: '20 - 50 years', value: 'aging' },
      { label: 'Over 50 years (Pre-1978)', value: 'historic' }
    ]
  },
  {
    id: 'a_sqft',
    category: 'A. General Home Information',
    text: 'What is the approximate square footage of the home?',
    options: [
      { label: '1 to 1,000', value: '1k' },
      { label: '1,001 - 2,000', value: '2k' },
      { label: '2,001 - 3,000', value: '3k' },
      { label: '3,001 - 5,000', value: '5k' },
      { label: 'Over 5,000', value: '>5k' }
    ]
  },
  {
    id: 'a_major_changes',
    category: 'A. General Home Information',
    text: 'Have there been any major changes or events in the home within the last 12 months?',
    options: [
      { label: 'Yes (Renovations, Floods, New Roof)', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'a_occupants',
    category: 'A. General Home Information',
    text: 'How many people live in the home?',
    options: [
      { label: '1 - 2 People', value: 'small' },
      { label: '3 - 5 People', value: 'medium' },
      { label: '6 or more', value: 'large' }
    ]
  },
  {
    id: 'a_schedule',
    category: 'A. General Home Information',
    text: 'What is the typical daily schedule?',
    options: [
      { label: 'Home most of the day (Remote work/Stay at home)', value: 'home_all_day', flag: 'yellow' },
      { label: 'Away during the day (Work/School)', value: 'away_day' },
      { label: 'Mixed schedules', value: 'mixed' }
    ]
  },
  {
    id: 'a_smoking',
    category: 'A. General Home Information',
    text: 'Does anyone in the home smoke or vape?',
    options: [
      { label: 'No', value: 'no', flag: 'green' },
      { label: 'Yes, Outdoors only', value: 'outdoors', flag: 'yellow' },
      { label: 'Yes, Indoors', value: 'indoors', flag: 'red' }
    ]
  },

  // --- SECTION B: HVAC / Furnace / Air Handler ---
  {
    id: 'b_hvac_type',
    category: 'B. HVAC & Furnace Systems',
    text: 'What type of HVAC system do you have?',
    options: [
      { label: 'Forced Air (Furnace/Central AC)', value: 'forced_air' },
      { label: 'Heat Pump / Mini-split', value: 'heat_pump' },
      { label: 'Boiler / Radiators (No Ducts)', value: 'boiler' },
      { label: 'Electric Baseboard / Window Units', value: 'baseboard' }
    ]
  },
  {
    id: 'b_hvac_age',
    category: 'B. HVAC & Furnace Systems',
    text: 'How old is your HVAC system?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Less than 5 years', value: '<5', flag: 'green' },
      { label: '5 - 15 years', value: '5-15' },
      { label: 'Older than 15 years', value: '>15', flag: 'yellow' }
    ]
  },
  {
    id: 'b_hvac_service',
    category: 'B. HVAC & Furnace Systems',
    text: 'When was the last time your furnace or air handler was professionally serviced?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Within last 6 months', value: '<6mo', flag: 'green' },
      { label: 'Within last year', value: '1yr' },
      { label: 'More than 2 years ago', value: '>2yr', flag: 'red' },
      { label: 'Never / I do not know', value: 'unknown', flag: 'red' }
    ]
  },
  {
    id: 'b_coils_cleaned',
    category: 'B. HVAC & Furnace Systems',
    text: 'When was the last time your HVAC system’s coils were cleaned?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Within last 12 months', value: 'recent', flag: 'green' },
      { label: 'Over a year ago', value: 'old', flag: 'yellow' },
      { label: 'Never / I do not know', value: 'never', flag: 'red' }
    ]
  },
  {
    id: 'b_duct_cleaning',
    category: 'B. HVAC & Furnace Systems',
    text: 'When was the last time you had your air ducts cleaned?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Within the last 6 months', value: '<6mo', flag: 'green' },
      { label: 'Within the last year', value: '1yr', flag: 'green' },
      { label: 'More than two years', value: '>2yr', flag: 'yellow' },
      { label: 'Never / I do not know', value: 'unknown', flag: 'red' },
      { label: "I don't have air ducts", value: 'none', flag: 'green' }
    ]
  },
  {
    id: 'b_filter_freq',
    category: 'B. HVAC & Furnace Systems',
    text: 'How often do you change your HVAC filters?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Every 1-3 months', value: '1-3mo', flag: 'green' },
      { label: 'Every 6 months', value: '6mo', flag: 'yellow' },
      { label: 'Once a year or less', value: '1yr+', flag: 'red' }
    ]
  },
  {
    id: 'b_filter_type',
    category: 'B. HVAC & Furnace Systems',
    text: 'What type of filter do you use?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Basic Fiberglass (See-through)', value: 'fiberglass', flag: 'yellow' },
      { label: 'Pleated (MERV 8-11)', value: 'pleated', flag: 'green' },
      { label: 'High Performance (HEPA / MERV 13+)', value: 'hepa', flag: 'green' },
      { label: 'Washable / Electrostatic', value: 'washable', flag: 'yellow' }
    ]
  },
  {
    id: 'b_noises',
    category: 'B. HVAC & Furnace Systems',
    text: 'Have you noticed any unusual noises (banging, rattling, squealing) from the HVAC system?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'b_shutdown',
    category: 'B. HVAC & Furnace Systems',
    text: 'Has the system ever shut down unexpectedly within the last year?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air', 'heat_pump'] },
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'b_hvac_odors',
    category: 'B. HVAC & Furnace Systems',
    text: 'Have you noticed any musty or chemical odors when the HVAC system turns on?',
    options: [
      { label: 'No', value: 'no' },
      { label: 'Yes, Musty/Dirty Sock smell', value: 'musty', flag: 'red' },
      { label: 'Yes, Burning/Chemical smell', value: 'chemical', flag: 'red' }
    ]
  },
  {
    id: 'b_vents_status',
    category: 'B. HVAC & Furnace Systems',
    text: 'Do you regularly keep vents open or do you close some vents in rooms?',
    conditionalOn: { questionId: 'b_hvac_type', value: ['forced_air'] },
    options: [
      { label: 'All vents kept open', value: 'open', flag: 'green' },
      { label: 'I close vents in unused rooms', value: 'closed', flag: 'yellow' }
    ]
  },
  {
    id: 'b_temp_imbalance',
    category: 'B. HVAC & Furnace Systems',
    text: 'Are there any rooms that feel significantly warmer, colder, or more humid/dry than others?',
    options: [
      { label: 'Yes, significant difference', value: 'yes', flag: 'yellow' },
      { label: 'No, fairly even', value: 'no' }
    ]
  },

  // --- SECTION C: Ventilation Systems & Airflow ---
  {
    id: 'c_mech_vent',
    category: 'C. Ventilation & Airflow',
    text: 'Does your home have a mechanical ventilation system (ERV, HRV, or fresh-air intake)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'green' },
      { label: 'No', value: 'no' },
      { label: 'I do not know', value: 'unknown' }
    ]
  },
  {
    id: 'c_mech_service',
    category: 'C. Ventilation & Airflow',
    text: 'If yes, when was it last serviced or cleaned?',
    conditionalOn: { questionId: 'c_mech_vent', value: 'yes' },
    options: [
      { label: 'Last 12 months', value: 'recent', flag: 'green' },
      { label: 'More than a year ago', value: 'old', flag: 'yellow' },
      { label: 'Never', value: 'never', flag: 'red' }
    ]
  },
  {
    id: 'c_bath_fans',
    category: 'C. Ventilation & Airflow',
    text: 'Do you use bathroom exhaust fans during showers?',
    options: [
      { label: 'Yes, every time', value: 'always', flag: 'green' },
      { label: 'Sometimes', value: 'sometimes', flag: 'yellow' },
      { label: 'No / Do not have one', value: 'no', flag: 'red' }
    ]
  },
  {
    id: 'c_bath_vent_loc',
    category: 'C. Ventilation & Airflow',
    text: 'Do bathroom fans vent outdoors or into the attic?',
    conditionalOn: { questionId: 'c_bath_fans', value: ['always', 'sometimes'] },
    options: [
      { label: 'Outdoors (Roof/Soffit)', value: 'outdoors', flag: 'green' },
      { label: 'Into Attic or Garage', value: 'attic', flag: 'red' },
      { label: 'I do not know', value: 'unknown', flag: 'yellow' }
    ]
  },
  {
    id: 'c_range_hood',
    category: 'C. Ventilation & Airflow',
    text: 'Do you use your kitchen range hood?',
    options: [
      { label: 'Yes, always when cooking', value: 'always', flag: 'green' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'No / Do not have one', value: 'no', flag: 'yellow' }
    ]
  },
  {
    id: 'c_range_vent',
    category: 'C. Ventilation & Airflow',
    text: 'Does your range hood vent outdoors or recirculate into the room?',
    conditionalOn: { questionId: 'c_range_hood', value: ['always', 'sometimes'] },
    options: [
      { label: 'Vents Outdoors', value: 'outdoors', flag: 'green' },
      { label: 'Recirculates (Filter)', value: 'recirculate', flag: 'yellow' },
      { label: 'Unknown', value: 'unknown' }
    ]
  },
  {
    id: 'c_window_cond',
    category: 'C. Ventilation & Airflow',
    text: 'Have you noticed condensation forming on windows?',
    options: [
      { label: 'Yes, frequently', value: 'yes', flag: 'red' },
      { label: 'Occasionally in winter', value: 'winter' },
      { label: 'No', value: 'no', flag: 'green' }
    ]
  },
  {
    id: 'c_air_purifier',
    category: 'C. Ventilation & Airflow',
    text: 'Do you use portable air purifiers?',
    options: [
      { label: 'Yes, HEPA units', value: 'hepa' },
      { label: 'Yes, Ionic/Ozone units', value: 'ionic', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION D: Humidity & Moisture Conditions ---
  {
    id: 'd_monitor',
    category: 'D. Humidity & Moisture Control',
    text: 'Do you regularly monitor indoor humidity levels?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'green' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'd_high_humidity',
    category: 'D. Humidity & Moisture Control',
    text: 'Have you noticed humidity levels above 60% in any room (especially basement)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no', flag: 'green' },
      { label: 'I rarely check my home’s humidity levels', value: 'rarely', flag: 'yellow' }
    ]
  },
  {
    id: 'd_dry_winter',
    category: 'D. Humidity & Moisture Control',
    text: 'Does your home feel excessively dry during winter (static shocks, dry skin)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'd_humidifier_usage',
    category: 'D. Humidity & Moisture Control',
    text: 'Do you run humidifiers or dehumidifiers?',
    options: [
      { label: 'Dehumidifier (Basement)', value: 'dehu', flag: 'green' },
      { label: 'Humidifier (Bedrooms)', value: 'hum' },
      { label: 'Both', value: 'both' },
      { label: 'Neither', value: 'neither' }
    ]
  },
  {
    id: 'd_damp_smells',
    category: 'D. Humidity & Moisture Control',
    text: 'Have you experienced any damp smells, especially in the basement or crawlspace?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no', flag: 'green' }
    ]
  },
  {
    id: 'd_sump',
    category: 'D. Humidity & Moisture Control',
    text: 'Do you have a sump pump? Has it ever failed?',
    options: [
      { label: 'Yes, and it failed recently', value: 'failed', flag: 'red' },
      { label: 'Yes, works fine', value: 'works', flag: 'green' },
      { label: 'No sump pump', value: 'none' }
    ]
  },

  // --- SECTION E: Water Intrusion & Mold Risk ---
  {
    id: 'e_flood',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Has the basement ever flooded in the past 12 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no', flag: 'green' }
    ]
  },
  {
    id: 'e_plumbing',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Have you had any plumbing leaks (sinks, toilets, pipes)?',
    options: [
      { label: 'Yes, Active', value: 'active', flag: 'red' },
      { label: 'Yes, Repaired', value: 'repaired', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'e_appliance_leak',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Has any appliance leaked (dishwasher, fridge, washer)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'e_stains',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Have you observed any visible staining, discoloration, or bubbling paint on walls, ceilings, or baseboards that have not been addressed?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'e_roof',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Have you had a roof leak or suspected roof issue in the last year?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'e_gutters',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Have you had issues with gutters or downspouts overflowing near the foundation?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'e_visible_mold',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Have you noticed any visible mold or mildew anywhere?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no', flag: 'green' }
    ]
  },
  {
    id: 'e_musty_odor',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Do you notice any musty, earthy, or unusual odors anywhere in the home—especially in basements, closets, or after the HVAC runs?',
    options: [
      { label: 'No', value: 'no' },
      { label: 'Yes, in the basement', value: 'basement', flag: 'red' },
      { label: 'Yes, in closets or other storage areas', value: 'closets', flag: 'red' },
      { label: 'Yes, in whole rooms', value: 'rooms', flag: 'red' }
    ]
  },
  {
    id: 'e_remediation',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Has your home had mold remediation in the past?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'e_cold_cond',
    category: 'E. Water Intrusion & Mold Risk',
    text: 'Have you noticed condensation forming on cold surfaces (pipes/toilet tanks)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION F: Cleaning Habits ---
  {
    id: 'f_vacuum',
    category: 'F. Cleaning Habits',
    text: 'How often do you vacuum your home?',
    options: [
      { label: 'Daily / Several times a week', value: 'high', flag: 'green' },
      { label: 'Weekly', value: 'medium' },
      { label: 'Monthly or less', value: 'low', flag: 'yellow' }
    ]
  },
  {
    id: 'f_hepa_vac',
    category: 'F. Cleaning Habits',
    text: 'Do you use a vacuum with a HEPA filter?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'green' },
      { label: 'No / Standard', value: 'no' },
      { label: 'Unknown', value: 'unknown' }
    ]
  },
  {
    id: 'f_dust',
    category: 'F. Cleaning Habits',
    text: 'How often do you dust surfaces?',
    options: [
      { label: 'Weekly', value: 'weekly', flag: 'green' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'Rarely', value: 'rarely', flag: 'yellow' }
    ]
  },
  {
    id: 'f_chems',
    category: 'F. Cleaning Habits',
    text: 'What cleaning chemicals do you use regularly?',
    options: [
      { label: 'Bleach / Ammonia / Strong Sprays', value: 'harsh', flag: 'red' },
      { label: 'Standard Commercial Cleaners', value: 'standard' },
      { label: 'Green / Vinegar / Natural', value: 'green', flag: 'green' }
    ]
  },
  {
    id: 'f_new_products',
    category: 'F. Cleaning Habits',
    text: 'Have you introduced any new cleaning products in the past year?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'f_air_fresheners',
    category: 'F. Cleaning Habits',
    text: 'Do you use chemical air fresheners, plug-ins, scented candles, or incense?',
    options: [
      { label: 'Yes, Regularly', value: 'yes', flag: 'red' },
      { label: 'Occasionally', value: 'sometimes', flag: 'yellow' },
      { label: 'No', value: 'no', flag: 'green' }
    ]
  },
  {
    id: 'f_hobbies',
    category: 'F. Cleaning Habits',
    text: 'Do you use hobby materials like paints, adhesives, epoxies, or solvents inside?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'f_storage',
    category: 'F. Cleaning Habits',
    text: 'Do you store chemicals in the basement, garage, or indoors?',
    options: [
      { label: 'Indoors / Basement', value: 'indoors', flag: 'red' },
      { label: 'Attached Garage', value: 'garage', flag: 'yellow' },
      { label: 'Detached Shed / Outdoors', value: 'outdoors', flag: 'green' }
    ]
  },
  {
    id: 'f_aerosol',
    category: 'F. Cleaning Habits',
    text: 'Do you leave aerosol products stored in living spaces?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION G: VOC / Chemical Exposure ---
  {
    id: 'g_furniture',
    category: 'G. VOC & Chemical Exposure',
    text: 'Have you purchased new furniture within the last 12 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_flooring',
    category: 'G. VOC & Chemical Exposure',
    text: 'Did you install new carpeting or flooring in the past 12 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_paint',
    category: 'G. VOC & Chemical Exposure',
    text: 'Did you paint or repaint any rooms in the past 12 months?',
    options: [
      { label: 'Yes, Low VOC paint', value: 'low_voc', flag: 'green' },
      { label: 'Yes, Standard paint', value: 'standard', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_remodel',
    category: 'G. VOC & Chemical Exposure',
    text: 'Did you remodel or renovate any part of the home in the past 12 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_cabinets',
    category: 'G. VOC & Chemical Exposure',
    text: 'Have you installed new cabinets or particle-board furniture in the past 12 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_new_smell',
    category: 'G. VOC & Chemical Exposure',
    text: 'Have you noticed any “new home smell” that has lingered for months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_diffusers',
    category: 'G. VOC & Chemical Exposure',
    text: 'Do you use essential oil diffusers or fragrance machines?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_dry_clean',
    category: 'G. VOC & Chemical Exposure',
    text: 'Do you use dry-cleaned clothing or store it in closets soon after cleaning?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'g_garage_park',
    category: 'G. VOC & Chemical Exposure',
    text: 'Do you park vehicles in an attached garage?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No / Detached', value: 'no', flag: 'green' }
    ]
  },

  // --- SECTION H: Pets & Biologicals ---
  {
    id: 'h_pets',
    category: 'H. Pets & Biologicals',
    text: 'Do you have any pets?',
    options: [
      { label: 'Yes, Dogs/Cats', value: 'furry' },
      { label: 'Yes, Birds/Reptiles', value: 'other' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'h_shedding',
    category: 'H. Pets & Biologicals',
    text: 'Do pets shed frequently?',
    conditionalOn: { questionId: 'h_pets', value: 'furry' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'h_pet_furniture',
    category: 'H. Pets & Biologicals',
    text: 'Are pets allowed on furniture or bedding?',
    conditionalOn: { questionId: 'h_pets', value: 'furry' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'h_pet_basement',
    category: 'H. Pets & Biologicals',
    text: 'Do pets spend time in the basement or crawlspace?',
    conditionalOn: { questionId: 'h_pets', value: ['furry', 'other'] },
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'h_pests',
    category: 'H. Pets & Biologicals',
    text: 'Have you noticed any pest issues (rodents, insects, termites)?',
    options: [
      { label: 'Yes, current issue', value: 'active', flag: 'red' },
      { label: 'Past issue', value: 'past' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'h_pest_chem',
    category: 'H. Pets & Biologicals',
    text: 'Have you used pest control chemicals in the last 12 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION I: Indoor Activities ---
  {
    id: 'i_candles',
    category: 'I. Indoor Activities',
    text: 'Do you regularly burn candles or incense?',
    options: [
      { label: 'Yes, frequently', value: 'yes', flag: 'red' },
      { label: 'Occasionally', value: 'sometimes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'i_fireplace',
    category: 'I. Indoor Activities',
    text: 'Do you use a fireplace or wood stove?',
    options: [
      { label: 'Yes, Wood burning', value: 'wood', flag: 'red' },
      { label: 'Yes, Gas', value: 'gas', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'i_firewood',
    category: 'I. Indoor Activities',
    text: 'Do you store firewood indoors?',
    conditionalOn: { questionId: 'i_fireplace', value: 'wood' },
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'i_solid_fuel',
    category: 'I. Indoor Activities',
    text: 'Do you use a Solid fuel stove(wood, coal, pellets, etc.) part of the year?',
    options: [
      { label: 'No', value: 'no', flag: 'green' },
      { label: 'Yes, a wood stove', value: 'wood', flag: 'red' },
      { label: 'Yes, a coal stove', value: 'coal', flag: 'red' },
      { label: 'Yes, a pellet stove', value: 'pellet', flag: 'yellow' }
    ]
  },
  {
    id: 'i_grilling',
    category: 'I. Indoor Activities',
    text: 'Do you smoke food or grill close to the home entrances?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'i_space_heater',
    category: 'I. Indoor Activities',
    text: 'Do you use space heaters?',
    options: [
      { label: 'Yes, Electric', value: 'electric' },
      { label: 'Yes, Fuel-based (Propane/Kerosene)', value: 'fuel', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'i_hum_water',
    category: 'I. Indoor Activities',
    text: 'Do you use humidifiers with tap water (instead of distilled)?',
    options: [
      { label: 'Yes, Tap water', value: 'tap', flag: 'yellow' },
      { label: 'Distilled water', value: 'distilled', flag: 'green' },
      { label: 'I do not use one', value: 'none' }
    ]
  },

  // --- SECTION J: Basement, Crawlspace & Foundation ---
  {
    id: 'j_type',
    category: 'J. Basement, Crawlspace & Foundation',
    text: 'What type of foundation do you have?',
    options: [
      { label: 'Full Basement', value: 'basement' },
      { label: 'Crawlspace', value: 'crawlspace' },
      { label: 'Slab', value: 'slab' }
    ]
  },
  {
    id: 'j_finish',
    category: 'J. Basement, Crawlspace & Foundation',
    text: 'Is your basement finished or unfinished?',
    conditionalOn: { questionId: 'j_type', value: 'basement' },
    options: [
      { label: 'Finished', value: 'finished' },
      { label: 'Unfinished', value: 'unfinished' },
      { label: 'Partially', value: 'partial' }
    ]
  },
  {
    id: 'j_crawl',
    category: 'J. Basement, Crawlspace & Foundation',
    text: 'Is your crawlspace vented, sealed, or encapsulated?',
    conditionalOn: { questionId: 'j_type', value: 'crawlspace' },
    options: [
      { label: 'Vented (Dirt floor)', value: 'vented', flag: 'red' },
      { label: 'Sealed / Encapsulated', value: 'sealed', flag: 'green' },
      { label: 'Unknown', value: 'unknown' }
    ]
  },
  {
    id: 'j_dehu',
    category: 'J. Basement, Crawlspace & Foundation',
    text: 'Do you run a dehumidifier in the basement/crawlspace?',
    conditionalOn: { questionId: 'j_type', value: ['basement', 'crawlspace'] },
    options: [
      { label: 'Yes', value: 'yes', flag: 'green' },
      { label: 'No', value: 'no', flag: 'red' }
    ]
  },
  {
    id: 'j_cracks',
    category: 'J. Basement, Crawlspace & Foundation',
    text: 'Have you noticed cracks in the foundation walls or slab?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'j_damp_carpet',
    category: 'J. Basement, Crawlspace & Foundation',
    text: 'Have you noticed damp carpeting or warped baseboards in lower levels?',
    conditionalOn: { questionId: 'j_type', value: ['basement', 'slab'] },
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION K: Odors & Health Indicators ---
  {
    id: 'k_odors',
    category: 'K. Odors & Health Indicators',
    text: 'Have you noticed any persistent odors (musty, chemical, sewer gas)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'k_odor_timing',
    category: 'K. Odors & Health Indicators',
    text: 'Do odors get worse at certain times of day or when HVAC turns on?',
    conditionalOn: { questionId: 'k_odors', value: 'yes' },
    options: [
      { label: 'Yes, worse with HVAC', value: 'hvac', flag: 'red' },
      { label: 'Yes, worse at night/morning', value: 'time' },
      { label: 'Consistent', value: 'consistent' }
    ]
  },
  {
    id: 'k_health_issues',
    category: 'K. Odors & Health Indicators',
    text: 'Have you or household members experienced increased allergies, respiratory issues, or headaches?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'k_symptom_relief',
    category: 'K. Odors & Health Indicators',
    text: 'Do symptoms improve when away from the home?',
    conditionalOn: { questionId: 'k_health_issues', value: 'yes' },
    options: [
      { label: 'Yes, noticeable improvement', value: 'yes', flag: 'red' },
      { label: 'No change', value: 'no' }
    ]
  },
  {
    id: 'k_chronic',
    category: 'K. Odors & Health Indicators',
    text: 'Has anyone experienced chronic cough, congestion, fatigue, or eye irritation?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION L: Home Usage / Special Situations ---
  {
    id: 'l_cardboard',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you store cardboard boxes or paper items in damp areas (basement/garage)?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'l_shoes_policy',
    category: 'L. Home Usage & Special Situations',
    text: 'Is there a “no shoes worn in the home” policy?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'green' },
      { label: 'No', value: 'no', flag: 'yellow' }
    ]
  },
  {
    id: 'l_windows',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you keep windows open regularly?',
    options: [
      { label: 'Yes, seasonally', value: 'yes', flag: 'green' },
      { label: 'Rarely / Never', value: 'no' }
    ]
  },
  {
    id: 'l_plants',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you use indoor plants? How many?',
    options: [
      { label: 'None / Very few', value: 'low' },
      { label: 'Moderate amount', value: 'med' },
      { label: 'A lot (Jungle)', value: 'high', flag: 'yellow' }
    ]
  },
  {
    id: 'l_aquarium',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you have an aquarium or water feature inside the home?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'l_construction',
    category: 'L. Home Usage & Special Situations',
    text: 'Have you had any construction done near the property in the past 6 months?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'l_radon',
    category: 'L. Home Usage & Special Situations',
    text: 'Does the home have a known history of radon issues?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' },
      { label: 'Has not been tested', value: 'untested', flag: 'yellow' }
    ]
  },
  {
    id: 'l_ozone',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you use ozone machines or ionizers?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no', flag: 'green' }
    ]
  },
  {
    id: 'l_dryer',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you use a clothes dryer that vents indoors or outdoors?',
    options: [
      { label: 'Outdoors', value: 'outdoors', flag: 'green' },
      { label: 'Indoors / Bucket', value: 'indoors', flag: 'red' },
      { label: 'Unknown', value: 'unknown', flag: 'yellow' }
    ]
  },
  {
    id: 'l_electronics',
    category: 'L. Home Usage & Special Situations',
    text: 'Have you added new electronics or appliances within the last 12 months?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'l_workshop',
    category: 'L. Home Usage & Special Situations',
    text: 'Do you use a garage workshop involving sawdust or chemicals?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },

  // --- SECTION M: Final Environmental Indicators ---
  {
    id: 'm_dust_accum',
    category: 'M. Final Environmental Indicators',
    text: 'Have you noticed unusually high dust accumulation?',
    options: [
      { label: 'Yes, heavy dust', value: 'yes', flag: 'yellow' },
      { label: 'Normal amount', value: 'no' }
    ]
  },
  {
    id: 'm_register_dust',
    category: 'M. Final Environmental Indicators',
    text: 'Do you see dust buildup around HVAC registers?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'm_stale',
    category: 'M. Final Environmental Indicators',
    text: 'Does the home feel stale or lacking airflow?',
    options: [
      { label: 'Yes, heavy air', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'm_static',
    category: 'M. Final Environmental Indicators',
    text: 'Do you notice static electricity issues during winter?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'yellow' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'm_leaks',
    category: 'M. Final Environmental Indicators',
    text: 'Do you have air leaks around windows or doors?',
    options: [
      { label: 'Yes, drafty', value: 'yes', flag: 'yellow' },
      { label: 'No, sealed tight', value: 'no' }
    ]
  },
  {
    id: 'm_masking',
    category: 'M. Final Environmental Indicators',
    text: 'Do you use home fragrances to mask odors?',
    options: [
      { label: 'Yes', value: 'yes', flag: 'red' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'm_dryer_clean',
    category: 'M. Final Environmental Indicators',
    text: 'Has your dryer vent been cleaned in the past 5 years?',
    options: [
      { label: 'No', value: 'no', flag: 'yellow' },
      { label: 'Yes', value: 'yes', flag: 'green' },
      { label: 'Not applicable', value: 'na', flag: 'green' }
    ]
  },
  {
    id: 'm_chimney',
    category: 'M. Final Environmental Indicators',
    text: 'When was your last chimney cleaning?',
    conditionalOn: { questionId: 'i_fireplace', value: 'wood' },
    options: [
      { label: 'Last 12 months', value: 'recent', flag: 'green' },
      { label: 'Over a year ago', value: 'old', flag: 'red' },
      { label: 'Never', value: 'never', flag: 'red' }
    ]
  },
  {
    id: 'm_final_concern',
    category: 'M. Final Environmental Indicators',
    text: 'Is there anything else you feel might be affecting your home’s air quality?',
    options: [
      { label: 'No, that covers it', value: 'no' },
      { label: 'Yes, I have specific concerns not listed', value: 'yes' }
    ]
  },
  {
    id: 'm_specific_concerns',
    category: 'M. Final Environmental Indicators',
    text: 'Briefly tell us about the specific concerns you have regarding your home and its indoor air quality?',
    type: 'text',
    maxLength: 350,
    placeholder: 'Tell us more about your specific concerns here...',
    conditionalOn: { questionId: 'm_final_concern', value: 'yes' }
  }
];

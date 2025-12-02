import { CalculatorConfig } from '../types';

/* 
  In a full Next.js app, these would be separate files loaded dynamically.
  Here we bundle them for the SPA environment.
*/

const bmiCalculator: CalculatorConfig = {
  slug: 'bmi-calculator',
  category: 'health',
  icon: 'M4 6h16M4 12h16m-7 6h7', // Simple menu-like icon for demo
  content: {
    title: {
      en: 'BMI Calculator',
      'zh-CN': 'BMI 身体质量指数计算器'
    },
    description: {
      en: 'Calculate your Body Mass Index (BMI) accurately to check if you are at a healthy weight.',
      'zh-CN': '准确计算您的身体质量指数 (BMI)，检查您的体重是否健康。'
    },
    formula: {
      en: 'BMI = weight (kg) / height (m)²',
      'zh-CN': 'BMI = 体重 (kg) / 身高 (m)²'
    },
    article: {
      en: `
        <h3>What is BMI?</h3>
        <p>Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters. It is an inexpensive and easy screening method for weight category—underweight, healthy weight, overweight, and obesity.</p>
        <h3>How is it calculated?</h3>
        <p>The formula is simple: <code>BMI = kg / m²</code></p>
        <h3>BMI Categories</h3>
        <ul>
          <li>Underweight = <18.5</li>
          <li>Normal weight = 18.5–24.9</li>
          <li>Overweight = 25–29.9</li>
          <li>Obesity = BMI of 30 or greater</li>
        </ul>
      `,
      'zh-CN': `
        <h3>什么是 BMI？</h3>
        <p>身体质量指数 (BMI) 是一个人的体重（公斤）除以身高（米）的平方。这是一种简单且低成本的体重筛查方法，用于判断体重过轻、健康体重、超重或肥胖。</p>
        <h3>如何计算？</h3>
        <p>公式非常简单：<code>BMI = kg / m²</code></p>
        <h3>BMI 分类</h3>
        <ul>
          <li>体重过轻 = <18.5</li>
          <li>正常体重 = 18.5–24.9</li>
          <li>超重 = 25–29.9</li>
          <li>肥胖 = BMI 30 或更高</li>
        </ul>
      `
    }
  },
  inputs: [
    {
      id: 'height',
      type: 'number',
      label: { en: 'Height', 'zh-CN': '身高' },
      unit: 'cm',
      defaultValue: 170,
      validation: { min: 50, max: 300 }
    },
    {
      id: 'weight',
      type: 'number',
      label: { en: 'Weight', 'zh-CN': '体重' },
      unit: 'kg',
      defaultValue: 70,
      validation: { min: 20, max: 500 }
    }
  ],
  outputs: [
    {
      id: 'bmi',
      label: { en: 'Your BMI', 'zh-CN': '您的 BMI' },
      type: 'score'
    },
    {
      id: 'category',
      label: { en: 'Category', 'zh-CN': '健康分类' },
      type: 'category'
    }
  ],
  calculate: (values) => {
    const heightCm = Number(values.height);
    const weightKg = Number(values.weight);

    if (!heightCm || !weightKg) return { bmi: 0, category: '-' };

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    let categoryKey = '';
    if (bmi < 18.5) categoryKey = 'underweight';
    else if (bmi < 25) categoryKey = 'normal';
    else if (bmi < 30) categoryKey = 'overweight';
    else categoryKey = 'obese';

    // Simple localization mapping for the logic result (usually done via translation keys)
    const categoryMap: Record<string, Record<string, string>> = {
      underweight: { en: 'Underweight', 'zh-CN': '体重过轻' },
      normal: { en: 'Normal Weight', 'zh-CN': '正常体重' },
      overweight: { en: 'Overweight', 'zh-CN': '超重' },
      obese: { en: 'Obese', 'zh-CN': '肥胖' }
    };

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      category: categoryMap[categoryKey] // Returns the localized object to be resolved in UI
    };
  }
};

const idealWeightCalculator: CalculatorConfig = {
  slug: 'ideal-weight-calculator',
  category: 'health',
  icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', // Scale
  content: {
    title: { en: 'Ideal Weight Calculator', 'zh-CN': '理想体重计算器' },
    description: { en: 'Estimate your ideal body weight based on height and gender using the Devine Formula.', 'zh-CN': '基于 Devine 公式，根据身高和性别估算您的理想体重。' },
    formula: {
      en: 'Male: 50kg + 2.3kg/inch > 5ft',
      'zh-CN': '男性: 50kg + 2.3kg/英寸 (>5英尺)'
    },
    article: {
      en: `
        <h3>Ideal Body Weight (Devine Formula)</h3>
        <p>This calculator uses the Devine Formula (1974), which is widely used medically to estimate ideal body weight.</p>
        <p><strong>Men:</strong> 50 kg + 2.3 kg for every inch over 5 feet.</p>
        <p><strong>Women:</strong> 45.5 kg + 2.3 kg for every inch over 5 feet.</p>
      `,
      'zh-CN': `
        <h3>理想体重 (Devine 公式)</h3>
        <p>此计算器使用 Devine 公式 (1974)，该公式在医学上广泛用于估算理想体重。</p>
        <p><strong>男性：</strong> 50 kg + 超过 5 英尺每英寸增加 2.3 kg。</p>
        <p><strong>女性：</strong> 45.5 kg + 超过 5 英尺每英寸增加 2.3 kg。</p>
      `
    }
  },
  inputs: [
    {
      id: 'gender',
      type: 'select',
      label: { en: 'Gender', 'zh-CN': '性别' },
      defaultValue: 'male',
      options: [
        { value: 'male', label: { en: 'Male', 'zh-CN': '男性' } },
        { value: 'female', label: { en: 'Female', 'zh-CN': '女性' } }
      ]
    },
    {
      id: 'height',
      type: 'number',
      label: { en: 'Height', 'zh-CN': '身高' },
      unit: 'cm',
      defaultValue: 175,
      validation: { min: 100, max: 250 }
    }
  ],
  outputs: [
    { id: 'idealWeight', label: { en: 'Ideal Weight', 'zh-CN': '理想体重' }, type: 'score', unit: 'kg' }
  ],
  calculate: (values) => {
    const gender = values.gender;
    const heightCm = Number(values.height) || 0;
    
    // Convert to inches
    const heightInches = heightCm / 2.54;
    const inchesOver5ft = Math.max(0, heightInches - 60);

    let ideal = 0;
    if (gender === 'male') {
      ideal = 50 + (2.3 * inchesOver5ft);
    } else {
      ideal = 45.5 + (2.3 * inchesOver5ft);
    }

    return {
      idealWeight: ideal.toFixed(1)
    };
  }
};

const calorieCalculator: CalculatorConfig = {
  slug: 'calorie-calculator',
  category: 'health',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Lightning/Energy
  content: {
    title: { en: 'Calorie Calculator', 'zh-CN': '卡路里计算器' },
    description: { en: 'Estimate your daily calorie needs (TDEE) based on your BMR and activity level.', 'zh-CN': '根据基础代谢率 (BMR) 和活动水平估算您每日所需的卡路里 (TDEE)。' },
    formula: {
      en: 'TDEE = BMR × Activity Multiplier',
      'zh-CN': 'TDEE = BMR × 活动系数'
    },
    article: {
      en: `
        <h3>Understanding Daily Calorie Needs</h3>
        <p>This calculator uses the <strong>Mifflin-St Jeor Equation</strong> to estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).</p>
        <ul>
          <li><strong>BMR:</strong> Calories burned at complete rest.</li>
          <li><strong>TDEE:</strong> Total calories needed to maintain current weight.</li>
        </ul>
        <p>To lose weight, eat fewer calories than your TDEE. To gain weight, eat more.</p>
      `,
      'zh-CN': `
        <h3>了解每日热量需求</h3>
        <p>此计算器使用 <strong>Mifflin-St Jeor 公式</strong> 来估算您的基础代谢率 (BMR) 和每日总能量消耗 (TDEE)。</p>
        <ul>
          <li><strong>BMR:</strong> 完全休息时消耗的卡路里。</li>
          <li><strong>TDEE:</strong> 维持当前体重所需的总卡路里。</li>
        </ul>
        <p>要减肥，摄入的热量应少于 TDEE；要增重，摄入的热量应多于 TDEE。</p>
      `
    }
  },
  inputs: [
    {
      id: 'gender',
      type: 'select',
      label: { en: 'Gender', 'zh-CN': '性别' },
      defaultValue: 'male',
      options: [
        { value: 'male', label: { en: 'Male', 'zh-CN': '男性' } },
        { value: 'female', label: { en: 'Female', 'zh-CN': '女性' } }
      ]
    },
    {
      id: 'age',
      type: 'number',
      label: { en: 'Age', 'zh-CN': '年龄' },
      defaultValue: 25,
      validation: { min: 1, max: 120 }
    },
    {
      id: 'height',
      type: 'number',
      label: { en: 'Height', 'zh-CN': '身高' },
      unit: 'cm',
      defaultValue: 175
    },
    {
      id: 'weight',
      type: 'number',
      label: { en: 'Weight', 'zh-CN': '体重' },
      unit: 'kg',
      defaultValue: 70
    },
    {
      id: 'activity',
      type: 'select',
      label: { en: 'Activity Level', 'zh-CN': '活动水平' },
      defaultValue: '1.2',
      options: [
        { value: '1.2', label: { en: 'Sedentary (office job)', 'zh-CN': '久坐不动 (办公室工作)' } },
        { value: '1.375', label: { en: 'Light Exercise (1-2 days/week)', 'zh-CN': '轻度运动 (每周1-2天)' } },
        { value: '1.55', label: { en: 'Moderate Exercise (3-5 days/week)', 'zh-CN': '中度运动 (每周3-5天)' } },
        { value: '1.725', label: { en: 'Heavy Exercise (6-7 days/week)', 'zh-CN': '高强度运动 (每周6-7天)' } },
        { value: '1.9', label: { en: 'Athlete (2x per day)', 'zh-CN': '专业运动员 (每日两练)' } }
      ]
    }
  ],
  outputs: [
    { id: 'bmr', label: { en: 'BMR (Base)', 'zh-CN': '基础代谢率 (BMR)' }, type: 'score', unit: 'kcal' },
    { id: 'tdee', label: { en: 'Maintenance Calories', 'zh-CN': '维持体重所需热量' }, type: 'score', unit: 'kcal' }
  ],
  calculate: (values) => {
    const gender = values.gender;
    const age = Number(values.age) || 0;
    const height = Number(values.height) || 0;
    const weight = Number(values.weight) || 0;
    const activity = Number(values.activity) || 1.2;

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activity;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    };
  }
};

const bodyFatCalculator: CalculatorConfig = {
  slug: 'body-fat-calculator',
  category: 'health',
  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', // User Icon
  content: {
    title: { en: 'Body Fat Calculator', 'zh-CN': '体脂率计算器' },
    description: { en: 'Estimate your body fat percentage using the US Navy method.', 'zh-CN': '使用美国海军方法估算您的体脂百分比。' },
    formula: {
      en: 'US Navy Method (Logarithmic)',
      'zh-CN': '美国海军法 (对数公式)'
    },
    article: {
      en: `
        <h3>Body Fat Percentage</h3>
        <p>The US Navy Method is a widely used formula to estimate body fat based on body measurements.</p>
        <p>You need to measure your neck, waist, and (for women) hips.</p>
      `,
      'zh-CN': `
        <h3>体脂率</h3>
        <p>美国海军法是一种广泛使用的公式，根据身体测量值估算体脂。</p>
        <p>您需要测量您的颈围、腰围，以及（女性）臀围。</p>
      `
    }
  },
  inputs: [
    {
      id: 'gender',
      type: 'select',
      label: { en: 'Gender', 'zh-CN': '性别' },
      defaultValue: 'male',
      options: [
        { value: 'male', label: { en: 'Male', 'zh-CN': '男性' } },
        { value: 'female', label: { en: 'Female', 'zh-CN': '女性' } }
      ]
    },
    {
      id: 'height',
      type: 'number',
      label: { en: 'Height', 'zh-CN': '身高' },
      unit: 'cm',
      defaultValue: 175
    },
    {
      id: 'waist',
      type: 'number',
      label: { en: 'Waist (at navel)', 'zh-CN': '腰围 (肚脐处)' },
      unit: 'cm',
      defaultValue: 85
    },
    {
      id: 'neck',
      type: 'number',
      label: { en: 'Neck (below larynx)', 'zh-CN': '颈围 (喉结下方)' },
      unit: 'cm',
      defaultValue: 38
    },
    {
      id: 'hip',
      type: 'number',
      label: { en: 'Hip (Women only)', 'zh-CN': '臀围 (仅限女性)' },
      unit: 'cm',
      defaultValue: 95
    }
  ],
  outputs: [
    { id: 'bodyFat', label: { en: 'Body Fat Percentage', 'zh-CN': '体脂率' }, type: 'score', unit: '%' },
    { id: 'fatMass', label: { en: 'Fat Mass', 'zh-CN': '脂肪重量' }, type: 'category' } // Using category slot for simpler display or calculated below if weight provided, but here just %
  ],
  calculate: (values) => {
    const gender = values.gender;
    const h = Number(values.height);
    const w = Number(values.waist);
    const n = Number(values.neck);
    const hip = Number(values.hip);

    if (!h || !w || !n) return { bodyFat: 0, fatMass: '-' };

    let bf = 0;
    // Formulas use log10
    if (gender === 'male') {
      // 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      if (w - n <= 0) return { bodyFat: 0 };
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      // 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      if (w + hip - n <= 0) return { bodyFat: 0 };
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hip - n) + 0.22100 * Math.log10(h)) - 450;
    }

    return {
      bodyFat: Math.max(0, bf).toFixed(1),
      fatMass: bf > 25 ? (gender === 'male' ? 'High' : 'Average') : 'Normal' // Placeholder category logic
    };
  }
};

const waterIntakeCalculator: CalculatorConfig = {
  slug: 'water-intake-calculator',
  category: 'health',
  icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', // Drop icon (reusing moon path partially or custom)
  content: {
    title: { en: 'Water Intake Calculator', 'zh-CN': '每日饮水计算器' },
    description: { en: 'Estimate how much water you should drink daily based on your weight and activity.', 'zh-CN': '根据您的体重和活动量估算每日建议饮水量。' },
    formula: {
      en: 'Total = (Weight × 0.033) + (Activity min × 0.012)',
      'zh-CN': '总量 = (体重 × 0.033) + (运动分钟 × 0.012)'
    },
    article: {
      en: `
        <h3>Hydration Needs</h3>
        <p>Drinking enough water is crucial for health. This calculator provides a baseline recommendation.</p>
        <p>The general rule is approximately 33ml per kg of body weight, plus extra for exercise.</p>
      `,
      'zh-CN': `
        <h3>水分需求</h3>
        <p>喝足够的水对健康至关重要。此计算器提供基本的饮水建议。</p>
        <p>通常建议每公斤体重摄入约 33 毫升水，运动时需额外补充。</p>
      `
    }
  },
  inputs: [
    {
      id: 'weight',
      type: 'number',
      label: { en: 'Weight', 'zh-CN': '体重' },
      unit: 'kg',
      defaultValue: 70
    },
    {
      id: 'exercise',
      type: 'number',
      label: { en: 'Daily Exercise', 'zh-CN': '每日运动时间' },
      unit: 'min',
      defaultValue: 30
    }
  ],
  outputs: [
    { id: 'intake', label: { en: 'Daily Water Intake', 'zh-CN': '每日建议饮水量' }, type: 'score', unit: 'L' }
  ],
  calculate: (values) => {
    const weight = Number(values.weight) || 0;
    const exercise = Number(values.exercise) || 0;

    // Base: 33ml per kg. Exercise: ~12ml per min of exercise
    const base = weight * 0.033;
    const extra = exercise * (0.35 / 30); // approx 350ml per 30 mins

    const total = base + extra;

    return {
      intake: total.toFixed(2)
    };
  }
};

const finalGradeCalculator: CalculatorConfig = {
  slug: 'final-grade-calculator',
  category: 'education',
  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', // Book
  content: {
    title: { en: 'Final Grade Calculator', 'zh-CN': '期末成绩计算器' },
    description: { en: 'Calculate what grade you need on your final exam to reach your target class grade.', 'zh-CN': '计算期末考试需要考多少分才能达到目标课程成绩。' },
    formula: {
      en: 'Final = (Goal - Current × (1 - Weight)) / Weight',
      'zh-CN': '期末分 = (目标分 - 当前分 × (1 - 权重)) / 权重'
    },
    article: {
      en: `
        <h3>Planning for Finals</h3>
        <p>Use this tool to see exactly what score you need on your final exam to get an A (or any other grade) in the class.</p>
        <p>You need to know your current grade and how much the final exam is worth (weight).</p>
      `,
      'zh-CN': `
        <h3>期末规划</h3>
        <p>使用此工具可以确切地知道期末考试需要多少分才能拿到 A（或其他目标成绩）。</p>
        <p>您需要知道当前的成绩以及期末考试在总成绩中的占比（权重）。</p>
      `
    }
  },
  inputs: [
    {
      id: 'currentGrade',
      type: 'number',
      label: { en: 'Current Grade', 'zh-CN': '当前成绩' },
      unit: '%',
      defaultValue: 85
    },
    {
      id: 'targetGrade',
      type: 'number',
      label: { en: 'Target Grade', 'zh-CN': '目标成绩' },
      unit: '%',
      defaultValue: 90
    },
    {
      id: 'finalWeight',
      type: 'number',
      label: { en: 'Final Exam Weight', 'zh-CN': '期末考试占比' },
      unit: '%',
      defaultValue: 30
    }
  ],
  outputs: [
    { id: 'needed', label: { en: 'Score Needed', 'zh-CN': '需要考取' }, type: 'score', unit: '%' }
  ],
  calculate: (values) => {
    const current = Number(values.currentGrade) || 0;
    const target = Number(values.targetGrade) || 0;
    const weight = Number(values.finalWeight) || 0;

    if (weight === 0) return { needed: 0 };

    const w = weight / 100;
    // Target = Current*(1-w) + Final*w
    // Final = (Target - Current*(1-w)) / w
    const needed = (target - (current * (1 - w))) / w;

    return {
      needed: needed.toFixed(1)
    };
  }
};

const gpaCalculator: CalculatorConfig = {
  slug: 'gpa-calculator',
  category: 'education',
  icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', // Briefcase / School bag
  content: {
    title: { en: 'GPA Calculator', 'zh-CN': 'GPA 绩点计算器' },
    description: { en: 'Calculate your semester GPA based on grades and credits.', 'zh-CN': '根据成绩和学分计算您的学期 GPA。' },
    formula: {
      en: 'GPA = Σ (Grade Points × Credits) / Σ Credits',
      'zh-CN': 'GPA = Σ (绩点 × 学分) / Σ 学分'
    },
    article: {
      en: `<h3>GPA Calculation</h3><p>Enter your 4 classes below assuming a standard 4.0 scale.</p>`,
      'zh-CN': `<h3>GPA 计算</h3><p>输入您的 4 门课程成绩，假设采用标准的 4.0 学分制。</p>`
    }
  },
  inputs: [
    { id: 'g1', type: 'number', label: { en: 'Class 1 Grade (0-4)', 'zh-CN': '课程 1 绩点' }, defaultValue: 4 },
    { id: 'c1', type: 'number', label: { en: 'Class 1 Credits', 'zh-CN': '课程 1 学分' }, defaultValue: 3 },
    { id: 'g2', type: 'number', label: { en: 'Class 2 Grade (0-4)', 'zh-CN': '课程 2 绩点' }, defaultValue: 3.5 },
    { id: 'c2', type: 'number', label: { en: 'Class 2 Credits', 'zh-CN': '课程 2 学分' }, defaultValue: 3 },
    { id: 'g3', type: 'number', label: { en: 'Class 3 Grade (0-4)', 'zh-CN': '课程 3 绩点' }, defaultValue: 3 },
    { id: 'c3', type: 'number', label: { en: 'Class 3 Credits', 'zh-CN': '课程 3 学分' }, defaultValue: 4 },
    { id: 'g4', type: 'number', label: { en: 'Class 4 Grade (0-4)', 'zh-CN': '课程 4 绩点' }, defaultValue: 4 },
    { id: 'c4', type: 'number', label: { en: 'Class 4 Credits', 'zh-CN': '课程 4 学分' }, defaultValue: 2 },
  ],
  outputs: [
    { id: 'gpa', label: { en: 'GPA', 'zh-CN': '平均绩点' }, type: 'score' },
    { id: 'totalCredits', label: { en: 'Total Credits', 'zh-CN': '总学分' }, type: 'score' }
  ],
  calculate: (values) => {
    const grades = [Number(values.g1), Number(values.g2), Number(values.g3), Number(values.g4)];
    const credits = [Number(values.c1), Number(values.c2), Number(values.c3), Number(values.c4)];
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    for(let i=0; i<4; i++) {
        totalPoints += (grades[i] || 0) * (credits[i] || 0);
        totalCredits += (credits[i] || 0);
    }
    
    return {
        gpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0,
        totalCredits: totalCredits
    };
  }
};

const weightedGradeCalculator: CalculatorConfig = {
  slug: 'weighted-grade-calculator',
  category: 'education',
  icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', // Bar chart/Weights
  content: {
    title: { en: 'Weighted Grade Calculator', 'zh-CN': '加权成绩计算器' },
    description: { en: 'Calculate the average grade for a course with weighted assignments.', 'zh-CN': '计算包含加权作业的课程平均成绩。' },
    formula: { en: 'Avg = Σ(Grade × Weight) / ΣWeight', 'zh-CN': '平均分 = Σ(成绩 × 权重) / Σ权重' },
    article: {
      en: '<h3>Weighted Average</h3><p>Assign weights to each assignment or exam to find the final class grade.</p>',
      'zh-CN': '<h3>加权平均</h3><p>为每项作业或考试分配权重，以计算最终课程成绩。</p>'
    }
  },
  inputs: [
    { id: 'g1', type: 'number', label: { en: 'Grade 1 (%)', 'zh-CN': '成绩 1 (%)' }, defaultValue: 85 },
    { id: 'w1', type: 'number', label: { en: 'Weight 1 (%)', 'zh-CN': '权重 1 (%)' }, defaultValue: 20 },
    { id: 'g2', type: 'number', label: { en: 'Grade 2 (%)', 'zh-CN': '成绩 2 (%)' }, defaultValue: 90 },
    { id: 'w2', type: 'number', label: { en: 'Weight 2 (%)', 'zh-CN': '权重 2 (%)' }, defaultValue: 30 },
    { id: 'g3', type: 'number', label: { en: 'Grade 3 (%)', 'zh-CN': '成绩 3 (%)' }, defaultValue: 75 },
    { id: 'w3', type: 'number', label: { en: 'Weight 3 (%)', 'zh-CN': '权重 3 (%)' }, defaultValue: 50 },
  ],
  outputs: [
    { id: 'average', label: { en: 'Weighted Average', 'zh-CN': '加权平均分' }, type: 'score', unit: '%' }
  ],
  calculate: (values) => {
    const grades = [Number(values.g1), Number(values.g2), Number(values.g3)];
    const weights = [Number(values.w1), Number(values.w2), Number(values.w3)];
    
    let totalScore = 0;
    let totalWeight = 0;
    
    for (let i = 0; i < 3; i++) {
      if (!isNaN(grades[i]) && !isNaN(weights[i])) {
        totalScore += grades[i] * weights[i];
        totalWeight += weights[i];
      }
    }
    
    return {
      average: totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : 0
    };
  }
};

const readingTimeCalculator: CalculatorConfig = {
  slug: 'reading-time-calculator',
  category: 'education',
  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', // Book
  content: {
    title: { en: 'Reading Time Calculator', 'zh-CN': '阅读时长计算器' },
    description: { en: 'Estimate how long it takes to read a text based on word count.', 'zh-CN': '根据字数估算阅读文本所需的时长。' },
    formula: { en: 'Time = Words / WPM', 'zh-CN': '时间 = 字数 / 阅读速度' },
    article: {
      en: '<h3>Reading Speed</h3><p>Average reading speed is about 200-250 words per minute (WPM).</p>',
      'zh-CN': '<h3>阅读速度</h3><p>平均阅读速度约为每分钟 200-250 字。</p>'
    }
  },
  inputs: [
    { id: 'words', type: 'number', label: { en: 'Word Count', 'zh-CN': '总字数' }, defaultValue: 1000 },
    { id: 'wpm', type: 'number', label: { en: 'Reading Speed (WPM)', 'zh-CN': '阅读速度 (字/分)' }, defaultValue: 200 },
  ],
  outputs: [
    { id: 'minutes', label: { en: 'Reading Time', 'zh-CN': '阅读时长' }, type: 'score', unit: 'min' }
  ],
  calculate: (values) => {
    const w = Number(values.words) || 0;
    const speed = Number(values.wpm) || 1;
    return { minutes: Math.ceil(w / speed) };
  }
};

const attendanceCalculator: CalculatorConfig = {
  slug: 'attendance-calculator',
  category: 'education',
  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', // Checklist
  content: {
    title: { en: 'Attendance Calculator', 'zh-CN': '出勤率计算器' },
    description: { en: 'Check your current attendance percentage.', 'zh-CN': '计算您当前的出勤率。' },
    formula: { en: 'Rate = (Attended / Total) * 100', 'zh-CN': '出勤率 = (已出席 / 总课时) * 100' },
    article: {
      en: '<h3>Stay on Track</h3><p>Calculate your attendance percentage to ensure you meet course requirements.</p>',
      'zh-CN': '<h3>保持出勤</h3><p>计算您的出勤率，确保达到课程要求。</p>'
    }
  },
  inputs: [
    { id: 'total', type: 'number', label: { en: 'Total Classes Held', 'zh-CN': '已开课总数' }, defaultValue: 20 },
    { id: 'attended', type: 'number', label: { en: 'Classes Attended', 'zh-CN': '已出席次数' }, defaultValue: 18 },
  ],
  outputs: [
    { id: 'rate', label: { en: 'Attendance Rate', 'zh-CN': '出勤率' }, type: 'score', unit: '%' }
  ],
  calculate: (values) => {
    const total = Number(values.total) || 1;
    const attended = Number(values.attended) || 0;
    return { rate: ((attended / total) * 100).toFixed(1) };
  }
};

const gradePercentageCalculator: CalculatorConfig = {
  slug: 'test-grade-calculator',
  category: 'education',
  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', // Clipboard check
  content: {
    title: { en: 'Test Grade Calculator', 'zh-CN': '考试评分计算器' },
    description: { en: 'Calculate your test score percentage and letter grade based on points earned.', 'zh-CN': '根据得分计算考试百分比和等级成绩。' },
    formula: {
      en: 'Percentage = (Earned / Total) × 100',
      'zh-CN': '百分比 = (得分 / 总分) × 100'
    },
    article: {
      en: `
        <h3>Calculating Test Scores</h3>
        <p>Simple tool to find out your percentage score.</p>
        <p><strong>Formula:</strong> <code>Score / Total Points * 100</code></p>
      `,
      'zh-CN': `
        <h3>计算考试分数</h3>
        <p>简单的工具，用于计算您的得分百分比。</p>
        <p><strong>公式：</strong> <code>得分 / 总分 * 100</code></p>
      `
    }
  },
  inputs: [
    {
      id: 'earned',
      type: 'number',
      label: { en: 'Points Earned', 'zh-CN': '得分' },
      defaultValue: 45
    },
    {
      id: 'total',
      type: 'number',
      label: { en: 'Total Points', 'zh-CN': '总分' },
      defaultValue: 50
    }
  ],
  outputs: [
    { id: 'percentage', label: { en: 'Percentage', 'zh-CN': '百分比' }, type: 'score', unit: '%' },
    { id: 'letter', label: { en: 'Letter Grade', 'zh-CN': '等级' }, type: 'category' }
  ],
  calculate: (values) => {
    const earned = Number(values.earned) || 0;
    const total = Number(values.total) || 1;
    
    const pct = (earned / total) * 100;
    
    let letter = 'F';
    if (pct >= 90) letter = 'A';
    else if (pct >= 80) letter = 'B';
    else if (pct >= 70) letter = 'C';
    else if (pct >= 60) letter = 'D';

    return {
      percentage: pct.toFixed(1),
      letter: letter
    };
  }
};

const dogAgeCalculator: CalculatorConfig = {
  slug: 'dog-age-calculator',
  category: 'life',
  icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Smiley (Puppyish)
  content: {
    title: { en: 'Dog Age Calculator', 'zh-CN': '狗狗年龄计算器' },
    description: { en: 'Convert dog years to human years using the latest scientific formula.', 'zh-CN': '使用最新的科学公式将狗狗的年龄换算为人类年龄。' },
    formula: {
      en: 'Human Years = 16 × ln(Dog Age) + 31',
      'zh-CN': '人类年龄 = 16 × ln(狗狗年龄) + 31'
    },
    article: {
      en: `
        <h3>How old is my dog?</h3>
        <p>The old "multiply by 7" rule is outdated. Newer research suggests that dogs age much faster in their first few years.</p>
        <p>This calculator uses the logarithmic formula: <code>16 × ln(age) + 31</code>.</p>
      `,
      'zh-CN': `
        <h3>我的狗多大了？</h3>
        <p>旧的“乘以 7”法则已经过时了。最新研究表明，狗在头几年的衰老速度要快得多。</p>
        <p>此计算器使用对数公式：<code>16 × ln(age) + 31</code>。</p>
      `
    }
  },
  inputs: [
    {
      id: 'dogAge',
      type: 'number',
      label: { en: 'Dog Age', 'zh-CN': '狗狗实际年龄' },
      unit: 'years',
      defaultValue: 3,
      validation: { min: 1 }
    }
  ],
  outputs: [
    { id: 'humanAge', label: { en: 'Human Years', 'zh-CN': '人类年龄' }, type: 'score', unit: 'yrs' }
  ],
  calculate: (values) => {
    const age = Number(values.dogAge) || 0;
    if (age < 1) return { humanAge: 0 };
    
    // Formula: 16 * ln(age) + 31
    const humanAge = 16 * Math.log(age) + 31;

    return {
      humanAge: Math.round(humanAge)
    };
  }
};

const catAgeCalculator: CalculatorConfig = {
  slug: 'cat-age-calculator',
  category: 'life',
  icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Smiley (used for dog, generic pet)
  content: {
    title: { en: 'Cat Age Calculator', 'zh-CN': '猫咪年龄计算器' },
    description: { en: 'Convert cat years to human years.', 'zh-CN': '将猫的年龄换算为人类年龄。' },
    formula: { en: 'Year 1 = 15, Year 2 = +9, then +4/yr', 'zh-CN': '第1年=15岁，第2年+9岁，之后每年+4岁' },
    article: {
      en: '<h3>Cat Years</h3><p>Cats age rapidly in their first two years. A 2-year-old cat is roughly 24 in human years. After that, each cat year is about 4 human years.</p>',
      'zh-CN': '<h3>猫咪年龄</h3><p>猫在头两年衰老迅速。2 岁的猫大约相当于人类 24 岁。之后，猫的每一年大约相当于人类的 4 年。</p>'
    }
  },
  inputs: [
    { id: 'catAge', type: 'number', label: { en: 'Cat Age', 'zh-CN': '猫咪实际年龄' }, unit: 'years', defaultValue: 2 }
  ],
  outputs: [
    { id: 'humanAge', label: { en: 'Human Years', 'zh-CN': '人类年龄' }, type: 'score', unit: 'yrs' }
  ],
  calculate: (values) => {
    const age = Number(values.catAge) || 0;
    let human = 0;
    if (age <= 0) human = 0;
    else if (age === 1) human = 15;
    else if (age === 2) human = 24;
    else human = 24 + (age - 2) * 4;
    return { humanAge: human };
  }
};

const shoeSizeCalculator: CalculatorConfig = {
  slug: 'shoe-size-converter',
  category: 'life',
  icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', // Generic item
  content: {
    title: { en: 'Shoe Size Converter', 'zh-CN': '鞋码换算器' },
    description: { en: 'Convert between US, UK, and EU shoe sizes (Men/Women).', 'zh-CN': '在美码、英码和欧码之间进行换算（男/女）。' },
    formula: { en: 'Approximate conversion table', 'zh-CN': '近似换算表' },
    article: {
      en: '<h3>Shoe Sizes</h3><p>Approximate conversions. Sizes can vary by brand.</p>',
      'zh-CN': '<h3>鞋码</h3><p>近似换算。尺寸可能因品牌而异。</p>'
    }
  },
  inputs: [
    {
       id: 'gender', type: 'select', label: { en: 'Gender', 'zh-CN': '性别' }, defaultValue: 'm',
       options: [ {value:'m', label: {en:'Men', 'zh-CN':'男'}}, {value:'w', label: {en:'Women', 'zh-CN':'女'}} ]
    },
    { id: 'usSize', type: 'number', label: { en: 'US Size', 'zh-CN': '美码 (US)' }, defaultValue: 9 }
  ],
  outputs: [
    { id: 'ukSize', label: { en: 'UK Size', 'zh-CN': '英码 (UK)' }, type: 'score' },
    { id: 'euSize', label: { en: 'EU Size', 'zh-CN': '欧码 (EU)' }, type: 'score' }
  ],
  calculate: (values) => {
    const us = Number(values.usSize) || 0;
    const gender = values.gender;
    
    // Approximate offsets
    // Men: US = UK + 1 = (EU - 33) approx or EU approx 30+US
    // Let's use standard chart approximation
    // Men: UK = US - 1, EU = US + 33.5
    // Women: UK = US - 2, EU = US + 31.5
    
    let uk, eu;
    if (gender === 'm') {
      uk = us - 1;
      eu = us + 33; 
    } else {
      uk = us - 2;
      eu = us + 31;
    }
    return { ukSize: uk > 0 ? uk : 0, euSize: eu > 0 ? eu : 0 };
  }
};

const pizzaCalculator: CalculatorConfig = {
  slug: 'pizza-calculator',
  category: 'life',
  icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', // Triangle/Pizza-like
  content: {
    title: { en: 'Pizza Calculator', 'zh-CN': '披萨计算器' },
    description: { en: 'Estimate how many pizzas to order for your party.', 'zh-CN': '估算聚会需要订多少个披萨。' },
    formula: { en: 'Pizzas = (People × Slices per Person) / 8', 'zh-CN': '披萨数 = (人数 × 人均片数) / 8' },
    article: {
      en: '<h3>Pizza Planning</h3><p>Assumes standard large pizzas with 8 slices.</p>',
      'zh-CN': '<h3>披萨规划</h3><p>假设标准大号披萨切为 8 片。</p>'
    }
  },
  inputs: [
    { id: 'people', type: 'number', label: { en: 'Number of People', 'zh-CN': '人数' }, defaultValue: 10 },
    { 
      id: 'hunger', type: 'select', label: { en: 'Hunger Level', 'zh-CN': '饥饿程度' }, defaultValue: '3',
      options: [
        { value: '2', label: { en: 'Light (2 slices)', 'zh-CN': '小饭量 (2片)' } },
        { value: '3', label: { en: 'Medium (3 slices)', 'zh-CN': '中等 (3片)' } },
        { value: '4', label: { en: 'Hungry (4 slices)', 'zh-CN': '很饿 (4片)' } },
      ]
    }
  ],
  outputs: [
    { id: 'pizzas', label: { en: 'Pizzas to Order', 'zh-CN': '需订购披萨数' }, type: 'score', unit: '' }
  ],
  calculate: (values) => {
    const people = Number(values.people) || 0;
    const slices = Number(values.hunger) || 3;
    const totalSlices = people * slices;
    const pizzas = Math.ceil(totalSlices / 8);
    return { pizzas };
  }
};

const electricityCostCalculator: CalculatorConfig = {
  slug: 'electricity-cost-calculator',
  category: 'life',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Lightning
  content: {
    title: { en: 'Electricity Cost Calculator', 'zh-CN': '耗电成本计算器' },
    description: { en: 'Calculate the cost of electricity for any device.', 'zh-CN': '计算任何设备的耗电成本。' },
    formula: {
      en: 'Cost = (Watts × Hours / 1000) × Price',
      'zh-CN': '成本 = (瓦数 × 小时数 / 1000) × 单价'
    },
    article: {
      en: `
        <h3>Calculating Energy Cost</h3>
        <p>Find out how much your appliances cost to run.</p>
        <p>You need to know the power consumption (Watts), usage hours, and your electricity rate (per kWh).</p>
      `,
      'zh-CN': `
        <h3>计算能源成本</h3>
        <p>了解您的电器运行成本。</p>
        <p>您需要知道功耗（瓦特）、使用时长和电费（每千瓦时）。</p>
      `
    }
  },
  inputs: [
    {
      id: 'watts',
      type: 'number',
      label: { en: 'Power Consumption', 'zh-CN': '功率' },
      unit: 'W',
      defaultValue: 100
    },
    {
      id: 'hours',
      type: 'number',
      label: { en: 'Hours used per day', 'zh-CN': '每日使用时长' },
      unit: 'h',
      defaultValue: 5
    },
    {
      id: 'price',
      type: 'number',
      label: { en: 'Cost per kWh', 'zh-CN': '电费单价' },
      unit: '$/kWh',
      defaultValue: 0.15
    }
  ],
  outputs: [
    { id: 'dailyCost', label: { en: 'Cost per Day', 'zh-CN': '每日成本' }, type: 'currency', unit: '$' },
    { id: 'monthlyCost', label: { en: 'Cost per Month', 'zh-CN': '每月成本' }, type: 'currency', unit: '$' },
    { id: 'yearlyCost', label: { en: 'Cost per Year', 'zh-CN': '每年成本' }, type: 'currency', unit: '$' }
  ],
  calculate: (values) => {
    const watts = Number(values.watts) || 0;
    const hours = Number(values.hours) || 0;
    const price = Number(values.price) || 0;

    const kwhPerDay = (watts * hours) / 1000;
    const daily = kwhPerDay * price;
    const monthly = daily * 30;
    const yearly = daily * 365;

    return {
      dailyCost: daily.toFixed(2),
      monthlyCost: monthly.toFixed(2),
      yearlyCost: yearly.toFixed(2)
    };
  }
};

const fuelCostCalculator: CalculatorConfig = {
  slug: 'fuel-cost-calculator',
  category: 'life',
  icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Info Icon fallback - typically a car or gas pump
  content: {
    title: { en: 'Fuel Cost Calculator', 'zh-CN': '燃油成本计算器' },
    description: { en: 'Estimate the fuel cost for your trip.', 'zh-CN': '估算您的旅程燃油成本。' },
    formula: {
      en: 'Cost = (Distance / 100) × Consumption × Price',
      'zh-CN': '成本 = (距离 / 100) × 油耗 × 单价'
    },
    article: {
      en: `
        <h3>Fuel Cost Estimation</h3>
        <p>Plan your road trip budget by estimating the fuel cost.</p>
        <p>You need to know your car's fuel consumption (L/100km) and the current fuel price.</p>
      `,
      'zh-CN': `
        <h3>燃油成本估算</h3>
        <p>通过估算燃油成本来规划您的自驾游预算。</p>
        <p>您需要知道您的汽车油耗 (L/100km) 和当前的燃油价格。</p>
      `
    }
  },
  inputs: [
    {
      id: 'distance',
      type: 'number',
      label: { en: 'Trip Distance', 'zh-CN': '路程距离' },
      unit: 'km',
      defaultValue: 100
    },
    {
      id: 'consumption',
      type: 'number',
      label: { en: 'Fuel Consumption', 'zh-CN': '百公里油耗' },
      unit: 'L/100km',
      defaultValue: 8
    },
    {
      id: 'price',
      type: 'number',
      label: { en: 'Fuel Price', 'zh-CN': '燃油单价' },
      unit: '$/L',
      defaultValue: 1.5
    }
  ],
  outputs: [
    { id: 'totalCost', label: { en: 'Total Cost', 'zh-CN': '总成本' }, type: 'currency', unit: '$' },
    { id: 'fuelNeeded', label: { en: 'Fuel Needed', 'zh-CN': '所需燃油' }, type: 'score', unit: 'L' }
  ],
  calculate: (values) => {
    const dist = Number(values.distance) || 0;
    const cons = Number(values.consumption) || 0;
    const price = Number(values.price) || 0;

    const fuelNeeded = (dist / 100) * cons;
    const totalCost = fuelNeeded * price;

    return {
      totalCost: totalCost.toFixed(2),
      fuelNeeded: fuelNeeded.toFixed(1)
    };
  }
};

const percentageCalculator: CalculatorConfig = {
  slug: 'percentage-calculator',
  category: 'math',
  icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01', // Math symbols
  content: {
    title: {
      en: 'Percentage Calculator',
      'zh-CN': '百分比计算器'
    },
    description: {
      en: 'Calculate the percentage of a specific amount easily.',
      'zh-CN': '轻松计算数值的百分比。'
    },
    formula: {
      en: 'Result = (Amount × Percentage) / 100',
      'zh-CN': '结果 = (数值 × 百分比) / 100'
    },
    article: {
      en: `
        <h3>How to calculate percentage?</h3>
        <p>The formula to calculate the percentage of a number is:</p>
        <p><code>Result = (Amount × Percentage) / 100</code></p>
        <h3>Example</h3>
        <p>To find 20% of 500:</p>
        <p>500 × 20 / 100 = 100</p>
      `,
      'zh-CN': `
        <h3>如何计算百分比？</h3>
        <p>计算数值百分比的公式如下：</p>
        <p><code>结果 = (数值 × 百分比) / 100</code></p>
        <h3>示例</h3>
        <p>计算 500 的 20%：</p>
        <p>500 × 20 / 100 = 100</p>
      `
    }
  },
  inputs: [
    {
      id: 'amount',
      type: 'number',
      label: { en: 'Amount', 'zh-CN': '数值' },
      defaultValue: 100
    },
    {
      id: 'percentage',
      type: 'number',
      label: { en: 'Percentage', 'zh-CN': '百分比' },
      unit: '%',
      defaultValue: 20
    }
  ],
  outputs: [
    {
      id: 'result',
      label: { en: 'Result', 'zh-CN': '结果' },
      type: 'score'
    }
  ],
  calculate: (values) => {
    const amount = Number(values.amount) || 0;
    const percentage = Number(values.percentage) || 0;
    const result = (amount * percentage) / 100;
    return {
      result: parseFloat(result.toFixed(2))
    };
  }
};

const fractionCalculator: CalculatorConfig = {
  slug: 'fraction-calculator',
  category: 'math',
  icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14', // Hashtag/Fraction like
  content: {
    title: { en: 'Fraction Calculator', 'zh-CN': '分数计算器' },
    description: { en: 'Add, subtract, multiply, and divide fractions.', 'zh-CN': '分数的加、减、乘、除运算。' },
    formula: { en: 'a/b ± c/d = (ad ± bc) / bd', 'zh-CN': 'a/b ± c/d = (ad ± bc) / bd' },
    article: {
      en: '<h3>Fraction Rules</h3><p>To add or subtract, find a common denominator. To multiply, multiply numerators and denominators separately. To divide, multiply by the reciprocal.</p>',
      'zh-CN': '<h3>分数运算法则</h3><p>加减法需先通分。乘法将分子分母分别相乘。除法则是乘以除数的倒数。</p>'
    }
  },
  inputs: [
    { id: 'num1', type: 'number', label: { en: 'Numerator 1', 'zh-CN': '分子 1' }, defaultValue: 1 },
    { id: 'den1', type: 'number', label: { en: 'Denominator 1', 'zh-CN': '分母 1' }, defaultValue: 2 },
    {
      id: 'op', type: 'select', label: { en: 'Operation', 'zh-CN': '运算符' }, defaultValue: 'add',
      options: [
        { value: 'add', label: { en: '+ (Add)', 'zh-CN': '+ (加)' } },
        { value: 'sub', label: { en: '- (Subtract)', 'zh-CN': '- (减)' } },
        { value: 'mul', label: { en: '× (Multiply)', 'zh-CN': '× (乘)' } },
        { value: 'div', label: { en: '÷ (Divide)', 'zh-CN': '÷ (除)' } },
      ]
    },
    { id: 'num2', type: 'number', label: { en: 'Numerator 2', 'zh-CN': '分子 2' }, defaultValue: 1 },
    { id: 'den2', type: 'number', label: { en: 'Denominator 2', 'zh-CN': '分母 2' }, defaultValue: 3 },
  ],
  outputs: [
    { id: 'resultFraction', label: { en: 'Result (Fraction)', 'zh-CN': '结果 (分数)' }, type: 'text' },
    { id: 'decimal', label: { en: 'Decimal Value', 'zh-CN': '小数值得' }, type: 'score' }
  ],
  calculate: (values) => {
    const n1 = Number(values.num1);
    const d1 = Number(values.den1);
    const n2 = Number(values.num2);
    const d2 = Number(values.den2);
    const op = values.op;

    if (d1 === 0 || d2 === 0) return { resultFraction: 'Error', decimal: 'NaN' };

    let resN, resD;

    if (op === 'add') {
      resN = n1 * d2 + n2 * d1;
      resD = d1 * d2;
    } else if (op === 'sub') {
      resN = n1 * d2 - n2 * d1;
      resD = d1 * d2;
    } else if (op === 'mul') {
      resN = n1 * n2;
      resD = d1 * d2;
    } else { // div
      if (n2 === 0) return { resultFraction: 'Div by 0', decimal: 'Infinity' };
      resN = n1 * d2;
      resD = d1 * n2;
    }

    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const common = Math.abs(gcd(resN, resD));
    const finalN = resN / common;
    const finalD = resD / common;

    let text = `${finalN}/${finalD}`;
    if (finalD === 1) text = `${finalN}`;
    if (finalD === -1) text = `${-finalN}`;
    
    // Ensure denominator is positive for display
    if (finalD < 0) {
        text = `${-finalN}/${-finalD}`;
    }

    return {
      resultFraction: text,
      decimal: (resN / resD).toFixed(4)
    };
  }
};

const gcdLcmCalculator: CalculatorConfig = {
  slug: 'gcd-lcm-calculator',
  category: 'math',
  icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', // Stack/Database-ish but mathy enough
  content: {
    title: { en: 'GCD & LCM Calculator', 'zh-CN': '最大公约数 & 最小公倍数' },
    description: { en: 'Calculate the Greatest Common Divisor and Least Common Multiple of two numbers.', 'zh-CN': '计算两个数字的最大公约数 (GCD) 和最小公倍数 (LCM)。' },
    formula: { en: 'LCM(a,b) = |a·b| / GCD(a,b)', 'zh-CN': 'LCM(a,b) = |a·b| / GCD(a,b)' },
    article: {
      en: '<h3>GCD & LCM</h3><p><strong>GCD</strong> is the largest number that divides both integers without a remainder.</p><p><strong>LCM</strong> is the smallest positive integer that is divisible by both integers.</p>',
      'zh-CN': '<h3>GCD & LCM</h3><p><strong>最大公约数 (GCD)</strong> 是能同时整除两个整数的最大整数。</p><p><strong>最小公倍数 (LCM)</strong> 是能被两个整数同时整除的最小正整数。</p>'
    }
  },
  inputs: [
    { id: 'a', type: 'number', label: { en: 'Number A', 'zh-CN': '数字 A' }, defaultValue: 12 },
    { id: 'b', type: 'number', label: { en: 'Number B', 'zh-CN': '数字 B' }, defaultValue: 15 },
  ],
  outputs: [
    { id: 'gcd', label: { en: 'GCD', 'zh-CN': '最大公约数' }, type: 'score' },
    { id: 'lcm', label: { en: 'LCM', 'zh-CN': '最小公倍数' }, type: 'score' },
  ],
  calculate: (values) => {
    const a = Math.round(Number(values.a)) || 0;
    const b = Math.round(Number(values.b)) || 0;

    if (a === 0 || b === 0) return { gcd: 0, lcm: 0 };

    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const gcdVal = Math.abs(gcd(a, b));
    const lcmVal = Math.abs((a * b) / gcdVal);

    return {
      gcd: gcdVal,
      lcm: lcmVal
    };
  }
};

const scientificNotationCalculator: CalculatorConfig = {
  slug: 'scientific-notation-calculator',
  category: 'math',
  icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', // Beaker/Science
  content: {
    title: { en: 'Scientific Notation Converter', 'zh-CN': '科学计数法转换器' },
    description: { en: 'Convert decimal numbers to scientific notation.', 'zh-CN': '将十进制数转换为科学计数法。' },
    formula: { en: 'm × 10^n', 'zh-CN': 'm × 10^n' },
    article: {
      en: '<h3>Scientific Notation</h3><p>Scientific notation is a way of expressing numbers that are too large or too small to be conveniently written in decimal form.</p>',
      'zh-CN': '<h3>科学计数法</h3><p>科学计数法是一种表达太大或太小而无法方便地用十进制形式书写的数字的方法。</p>'
    }
  },
  inputs: [
    { id: 'num', type: 'number', label: { en: 'Decimal Number', 'zh-CN': '十进制数' }, defaultValue: 1234.56 },
  ],
  outputs: [
    { id: 'scientific', label: { en: 'Scientific Notation', 'zh-CN': '科学计数法' }, type: 'text' },
    { id: 'exponent', label: { en: 'Exponent (n)', 'zh-CN': '指数 (n)' }, type: 'score' }
  ],
  calculate: (values) => {
    const num = Number(values.num);
    if (isNaN(num)) return { scientific: '-', exponent: '-' };
    if (num === 0) return { scientific: '0 × 10⁰', exponent: 0 };

    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exponent);

    return {
      scientific: `${mantissa.toFixed(4)} × 10^${exponent}`,
      exponent: exponent
    };
  }
};

const pythagoreanCalculator: CalculatorConfig = {
  slug: 'pythagorean-calculator',
  category: 'math',
  icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', // Triangle-ish
  content: {
    title: { en: 'Pythagorean Calculator', 'zh-CN': '勾股定理计算器' },
    description: { en: 'Calculate the length of the hypotenuse of a right-angled triangle.', 'zh-CN': '计算直角三角形斜边的长度。' },
    formula: { en: 'c = √(a² + b²)', 'zh-CN': 'c = √(a² + b²)' },
    article: {
      en: '<h3>Pythagorean Theorem</h3><p>In a right-angled triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides.</p>',
      'zh-CN': '<h3>勾股定理</h3><p>在直角三角形中，斜边（直角对边）的平方等于其他两边的平方和。</p>'
    }
  },
  inputs: [
    { id: 'a', type: 'number', label: { en: 'Side A', 'zh-CN': '直角边 A' }, defaultValue: 3 },
    { id: 'b', type: 'number', label: { en: 'Side B', 'zh-CN': '直角边 B' }, defaultValue: 4 },
  ],
  outputs: [
    { id: 'c', label: { en: 'Hypotenuse (c)', 'zh-CN': '斜边 (c)' }, type: 'score' }
  ],
  calculate: (values) => {
    const a = Number(values.a) || 0;
    const b = Number(values.b) || 0;
    const c = Math.sqrt(a*a + b*b);
    return { c: c.toFixed(2) };
  }
};

const binaryCalculator: CalculatorConfig = {
  slug: 'binary-calculator',
  category: 'math',
  icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', // Code/Binary
  content: {
    title: { en: 'Binary Converter', 'zh-CN': '二进制转换器' },
    description: { en: 'Convert decimal numbers to binary and hexadecimal formats.', 'zh-CN': '将十进制数转换为二进制和十六进制格式。' },
    formula: { en: 'Base 10 -> Base 2', 'zh-CN': '10进制 -> 2进制' },
    article: {
      en: '<h3>Binary System</h3><p>Binary is a base-2 number system used by computers.</p>',
      'zh-CN': '<h3>二进制系统</h3><p>二进制是计算机使用的基数为 2 的数字系统。</p>'
    }
  },
  inputs: [
    { id: 'decimal', type: 'number', label: { en: 'Decimal Number', 'zh-CN': '十进制数' }, defaultValue: 42 },
  ],
  outputs: [
    { id: 'binary', label: { en: 'Binary', 'zh-CN': '二进制' }, type: 'text' },
    { id: 'hex', label: { en: 'Hexadecimal', 'zh-CN': '十六进制' }, type: 'text' },
  ],
  calculate: (values) => {
    const d = Math.floor(Number(values.decimal));
    if (isNaN(d)) return { binary: '-', hex: '-' };
    return {
      binary: d.toString(2),
      hex: d.toString(16).toUpperCase()
    };
  }
};

const simpleInterestCalculator: CalculatorConfig = {
  slug: 'simple-interest-calculator',
  category: 'finance',
  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Coin/Dollar
  content: {
    title: {
      en: 'Simple Interest Calculator',
      'zh-CN': '简单利息计算器'
    },
    description: {
      en: 'Calculate simple interest based on principal amount, annual interest rate, and time period.',
      'zh-CN': '根据本金、年利率和期限计算简单利息。'
    },
    formula: {
      en: 'I = P × r × t',
      'zh-CN': '利息 = 本金 × 年利率 × 期限'
    },
    article: {
      en: `
        <h3>Simple Interest Formula</h3>
        <p>Simple interest is calculated using the formula:</p>
        <p><code>I = P × r × t</code></p>
        <p>Where:</p>
        <ul>
            <li><strong>I</strong> = Interest Amount</li>
            <li><strong>P</strong> = Principal Amount</li>
            <li><strong>r</strong> = Annual Interest Rate (as a decimal)</li>
            <li><strong>t</strong> = Time Period (in years)</li>
        </ul>
        <p>The total amount is <code>A = P + I</code>.</p>
      `,
      'zh-CN': `
        <h3>简单利息公式</h3>
        <p>简单利息的计算公式如下：</p>
        <p><code>I = P × r × t</code></p>
        <p>其中：</p>
        <ul>
            <li><strong>I</strong> = 利息总额</li>
            <li><strong>P</strong> = 本金</li>
            <li><strong>r</strong> = 年利率 (小数形式)</li>
            <li><strong>t</strong> = 期限 (年)</li>
        </ul>
        <p>本息合计为 <code>A = P + I</code>。</p>
      `
    }
  },
  inputs: [
    {
      id: 'principal',
      type: 'number',
      label: { en: 'Principal Amount', 'zh-CN': '本金' },
      unit: '$',
      defaultValue: 1000
    },
    {
      id: 'rate',
      type: 'number',
      label: { en: 'Annual Rate', 'zh-CN': '年利率' },
      unit: '%',
      defaultValue: 5
    },
    {
      id: 'time',
      type: 'number',
      label: { en: 'Time Period', 'zh-CN': '期限' },
      unit: 'yr',
      defaultValue: 1
    }
  ],
  outputs: [
    {
      id: 'interest',
      label: { en: 'Interest Amount', 'zh-CN': '利息总额' },
      type: 'currency',
      unit: '$'
    },
    {
      id: 'total',
      label: { en: 'Total Amount', 'zh-CN': '本息合计' },
      type: 'currency',
      unit: '$'
    }
  ],
  calculate: (values) => {
    const principal = Number(values.principal) || 0;
    const rate = Number(values.rate) || 0;
    const time = Number(values.time) || 0;

    const interest = principal * (rate / 100) * time;
    const total = principal + interest;

    return {
      interest: interest.toFixed(2),
      total: total.toFixed(2)
    };
  }
};

const compoundInterestCalculator: CalculatorConfig = {
  slug: 'compound-interest-calculator',
  category: 'finance',
  icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', // Trend up
  content: {
    title: { en: 'Compound Interest Calculator', 'zh-CN': '复利计算器' },
    description: { en: 'Calculate investment growth over time with monthly contributions and compounding interest.', 'zh-CN': '计算包含每月供款和复利增长的投资回报。' },
    formula: {
      en: 'FV = P(1+r/n)^(nt) + PMT * ...',
      'zh-CN': '终值 = 本金(1+r/n)^(nt) + 月供 * ...'
    },
    article: {
      en: `
        <h3>Power of Compound Interest</h3>
        <p>Compound interest allows your money to grow faster because you earn interest on both your initial principal and the accumulated interest from previous periods.</p>
        <p>This calculator assumes interest is compounded monthly.</p>
      `,
      'zh-CN': `
        <h3>复利的力量</h3>
        <p>复利可以让您的财富增长得更快，因为您不仅可以获得本金的利息，还可以获得之前积累利息的利息（利滚利）。</p>
        <p>此计算器假设按月复利。</p>
      `
    }
  },
  inputs: [
    {
      id: 'principal',
      type: 'number',
      label: { en: 'Initial Investment', 'zh-CN': '初始投资' },
      unit: '$',
      defaultValue: 5000
    },
    {
      id: 'monthlyContribution',
      type: 'number',
      label: { en: 'Monthly Contribution', 'zh-CN': '每月追加' },
      unit: '$',
      defaultValue: 200
    },
    {
      id: 'rate',
      type: 'number',
      label: { en: 'Annual Interest Rate', 'zh-CN': '年利率' },
      unit: '%',
      defaultValue: 7
    },
    {
      id: 'years',
      type: 'number',
      label: { en: 'Investment Period', 'zh-CN': '投资年限' },
      unit: 'years',
      defaultValue: 10
    }
  ],
  outputs: [
    { id: 'futureValue', label: { en: 'Future Value', 'zh-CN': '未来价值' }, type: 'currency', unit: '$' },
    { id: 'totalInterest', label: { en: 'Total Interest Earned', 'zh-CN': '利息总收益' }, type: 'currency', unit: '$' }
  ],
  calculate: (values) => {
    const p = Number(values.principal) || 0;
    const pmt = Number(values.monthlyContribution) || 0;
    const rate = Number(values.rate) || 0;
    const years = Number(values.years) || 0;

    const r = rate / 100 / 12; // Monthly rate
    const n = years * 12; // Total months

    let fv = 0;
    if (rate === 0) {
      fv = p + (pmt * n);
    } else {
      fv = p * Math.pow(1 + r, n) + (pmt * (Math.pow(1 + r, n) - 1)) / r;
    }

    const totalInvested = p + (pmt * n);
    const interest = fv - totalInvested;

    return {
      futureValue: fv.toFixed(2),
      totalInterest: interest.toFixed(2)
    };
  }
};

const roiCalculator: CalculatorConfig = {
  slug: 'roi-calculator',
  category: 'finance',
  icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', // Bar chart
  content: {
    title: { en: 'ROI Calculator', 'zh-CN': '投资回报率计算器' },
    description: { en: 'Calculate the Return on Investment (ROI) and net profit.', 'zh-CN': '计算投资回报率 (ROI) 和净利润。' },
    formula: {
      en: 'ROI = (Gain / Cost) × 100%',
      'zh-CN': 'ROI = (收益 / 成本) × 100%'
    },
    article: {
      en: `
        <h3>Return on Investment (ROI)</h3>
        <p>ROI is a performance measure used to evaluate the efficiency of an investment.</p>
        <p>It is calculated by subtracting the initial value of the investment from the final value of the investment, divided by the cost of the investment.</p>
      `,
      'zh-CN': `
        <h3>投资回报率 (ROI)</h3>
        <p>ROI 是一种用于评估投资效率的绩效指标。</p>
        <p>计算方法是用投资的最终价值减去投资的初始价值，再除以投资成本。</p>
      `
    }
  },
  inputs: [
    {
      id: 'invested',
      type: 'number',
      label: { en: 'Amount Invested', 'zh-CN': '投资金额' },
      unit: '$',
      defaultValue: 1000
    },
    {
      id: 'returned',
      type: 'number',
      label: { en: 'Amount Returned', 'zh-CN': '收回金额' },
      unit: '$',
      defaultValue: 1200
    }
  ],
  outputs: [
    { id: 'profit', label: { en: 'Net Profit', 'zh-CN': '净利润' }, type: 'currency', unit: '$' },
    { id: 'roi', label: { en: 'Return on Investment', 'zh-CN': '投资回报率' }, type: 'score', unit: '%' }
  ],
  calculate: (values) => {
    const invested = Number(values.invested) || 0;
    const returned = Number(values.returned) || 0;

    const profit = returned - invested;
    const roi = invested > 0 ? (profit / invested) * 100 : 0;

    return {
      profit: profit.toFixed(2),
      roi: roi.toFixed(2)
    };
  }
};

const marginCalculator: CalculatorConfig = {
  slug: 'margin-calculator',
  category: 'finance',
  icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z', // Pie chart
  content: {
    title: { en: 'Margin Calculator', 'zh-CN': '利润率计算器' },
    description: { en: 'Calculate gross margin percentage and profit from cost and revenue.', 'zh-CN': '根据成本和收入计算毛利率和利润。' },
    formula: { en: 'Margin = (Revenue - Cost) / Revenue', 'zh-CN': '利润率 = (收入 - 成本) / 收入' },
    article: {
      en: '<h3>Gross Margin</h3><p>Gross margin represents the percent of total sales revenue that the company retains after incurring the direct costs associated with producing the goods and services it sells.</p>',
      'zh-CN': '<h3>毛利率</h3><p>毛利率代表公司在扣除生产其销售的商品和服务相关的直接成本后保留的总销售收入百分比。</p>'
    }
  },
  inputs: [
    { id: 'cost', type: 'number', label: { en: 'Cost', 'zh-CN': '成本' }, defaultValue: 100 },
    { id: 'revenue', type: 'number', label: { en: 'Revenue', 'zh-CN': '收入' }, defaultValue: 150 },
  ],
  outputs: [
    { id: 'margin', label: { en: 'Gross Margin', 'zh-CN': '毛利率' }, type: 'score', unit: '%' },
    { id: 'profit', label: { en: 'Profit', 'zh-CN': '利润' }, type: 'currency', unit: '$' }
  ],
  calculate: (values) => {
    const cost = Number(values.cost) || 0;
    const rev = Number(values.revenue) || 0;
    if (rev === 0) return { margin: 0, profit: 0 };
    const profit = rev - cost;
    const margin = (profit / rev) * 100;
    return {
      margin: margin.toFixed(2),
      profit: profit.toFixed(2)
    };
  }
};

const dateCalculator: CalculatorConfig = {
  slug: 'date-calculator',
  category: 'date-time',
  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', // Calendar icon
  content: {
    title: {
      en: 'Date Calculator',
      'zh-CN': '日期计算器'
    },
    description: {
      en: 'Calculate the duration between two dates in days, months, and years.',
      'zh-CN': '计算两个日期之间的间隔，包括年、月和天数。'
    },
    formula: {
      en: 'Duration = End Date - Start Date',
      'zh-CN': '时间间隔 = 结束日期 - 开始日期'
    },
    article: {
      en: `
        <h3>Date Difference Calculation</h3>
        <p>This tool helps you calculate the duration between two specific dates.</p>
        <p>It breaks down the difference into:</p>
        <ul>
          <li><strong>Total Days:</strong> The absolute number of days between the start and end date.</li>
          <li><strong>Breakdown:</strong> The difference expressed in years, months, and remaining days.</li>
        </ul>
        <p>Note: The end date is excluded from the calculation by standard convention.</p>
      `,
      'zh-CN': `
        <h3>日期计算</h3>
        <p>此工具可以帮助您计算两个特定日期之间的持续时间。</p>
        <p>计算结果包括：</p>
        <ul>
          <li><strong>总天数：</strong> 开始日期和结束日期之间的绝对天数。</li>
          <li><strong>详细间隔：</strong> 用年、月和剩余天数表示的间隔。</li>
        </ul>
        <p>注意：按照惯例，结束日期不包含在计算内。</p>
      `
    }
  },
  inputs: [
    {
      id: 'startDate',
      type: 'date',
      label: { en: 'Start Date', 'zh-CN': '开始日期' },
      defaultValue: new Date().toISOString().split('T')[0]
    },
    {
      id: 'endDate',
      type: 'date',
      label: { en: 'End Date', 'zh-CN': '结束日期' },
      defaultValue: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]
    }
  ],
  outputs: [
    {
      id: 'breakdown',
      label: { en: 'Duration', 'zh-CN': '时间间隔' },
      type: 'text'
    },
    {
      id: 'totalDays',
      label: { en: 'Total Days', 'zh-CN': '总天数' },
      type: 'score',
      unit: 'days'
    }
  ],
  calculate: (values) => {
    const startInput = new Date(values.startDate);
    const endInput = new Date(values.endDate);

    if (isNaN(startInput.getTime()) || isNaN(endInput.getTime())) {
      return { breakdown: '-', totalDays: '-' };
    }

    // Normalize to midnight to avoid time issues, use local components
    const start = new Date(startInput.getFullYear(), startInput.getMonth(), startInput.getDate());
    const end = new Date(endInput.getFullYear(), endInput.getMonth(), endInput.getDate());

    // Swap if start > end
    const d1 = start < end ? start : end;
    const d2 = start < end ? end : start;

    // 1. Total Days
    const msPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.round((d2.getTime() - d1.getTime()) / msPerDay);

    // 2. Breakdown (Years, Months, Days) - Constructive Method
    // Step A: Calculate Years
    let years = d2.getFullYear() - d1.getFullYear();
    
    // Check if adding 'years' to d1 overshoots d2
    const tempYearDate = new Date(d1);
    tempYearDate.setFullYear(d1.getFullYear() + years);
    if (tempYearDate > d2) {
      years--;
    }

    // Advance d1 by years
    const afterYears = new Date(d1);
    afterYears.setFullYear(d1.getFullYear() + years);

    // Step B: Calculate Months
    let months = 0;
    let afterMonths = new Date(afterYears);
    
    // Iteratively add months until we overshoot
    while (true) {
      // Logic to add 1 month safely
      const nextMonthDate = new Date(afterMonths);
      nextMonthDate.setMonth(afterMonths.getMonth() + 1);
      
      // Handle day clamping (e.g., Jan 31 + 1 month -> Feb 28)
      // Javascript setMonth wraps, but preserves day index if possible, otherwise overflows
      // e.g. Jan 31 -> setMonth(1) -> Mar 3 (if non-leap). We want Feb 28.
      // Manually reconstruct to be safe:
      const targetYear = afterMonths.getFullYear() + Math.floor((afterMonths.getMonth() + 1) / 12);
      const targetMonth = (afterMonths.getMonth() + 1) % 12;
      const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
      // Clamp day
      const targetDay = Math.min(afterMonths.getDate(), daysInTargetMonth);
      
      const strictNextMonth = new Date(targetYear, targetMonth, targetDay);

      if (strictNextMonth > d2) break;

      afterMonths = strictNextMonth;
      months++;
      if (months > 12) break; // Safety break
    }

    // Step C: Remaining Days
    const remainingMs = d2.getTime() - afterMonths.getTime();
    const days = Math.round(remainingMs / msPerDay);

    // Localization helper
    const resultObj = {
      en: `${years}y ${months}m ${days}d`,
      'zh-CN': `${years}年 ${months}个月 ${days}天`
    };

    return {
      breakdown: resultObj,
      totalDays: totalDays
    };
  }
};

const workDaysCalculator: CalculatorConfig = {
  slug: 'work-days-calculator',
  category: 'date-time',
  icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', // Briefcase
  content: {
    title: { en: 'Work Days Calculator', 'zh-CN': '工作日计算器' },
    description: { en: 'Calculate the number of business days between two dates.', 'zh-CN': '计算两个日期之间的工作日天数。' },
    formula: { en: 'Total Days - Weekends', 'zh-CN': '总天数 - 周末' },
    article: {
      en: '<h3>Business Days</h3><p>Excludes Saturdays and Sundays from the total duration.</p>',
      'zh-CN': '<h3>工作日</h3><p>从总时长中排除周六和周日。</p>'
    }
  },
  inputs: [
    { id: 'start', type: 'date', label: { en: 'Start Date', 'zh-CN': '开始日期' }, defaultValue: new Date().toISOString().split('T')[0] },
    { id: 'end', type: 'date', label: { en: 'End Date', 'zh-CN': '结束日期' }, defaultValue: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0] }
  ],
  outputs: [
    { id: 'workDays', label: { en: 'Business Days', 'zh-CN': '工作日' }, type: 'score', unit: 'days' }
  ],
  calculate: (values) => {
    const s = new Date(values.start);
    const e = new Date(values.end);
    if(isNaN(s.getTime()) || isNaN(e.getTime())) return { workDays: 0 };
    
    let count = 0;
    let cur = new Date(s);
    while (cur <= e) {
      const day = cur.getDay();
      if(day !== 0 && day !== 6) count++; // 0=Sun, 6=Sat
      cur.setDate(cur.getDate() + 1);
    }
    // If start > end, logic above returns 0, which is correct
    return { workDays: count };
  }
};

const decimalHoursCalculator: CalculatorConfig = {
  slug: 'decimal-hours-calculator',
  category: 'date-time',
  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  content: {
    title: { en: 'Decimal Hours Converter', 'zh-CN': '十进制小时转换器' },
    description: { en: 'Convert time (HH:MM) to decimal hours.', 'zh-CN': '将时间 (HH:MM) 转换为十进制小时。' },
    formula: { en: 'Hours + Minutes/60', 'zh-CN': '小时 + 分钟/60' },
    article: {
      en: '<h3>Decimal Time</h3><p>Useful for payroll. e.g., 1:30 becomes 1.5.</p>',
      'zh-CN': '<h3>十进制时间</h3><p>适用于工资计算。例如，1:30 变为 1.5。</p>'
    }
  },
  inputs: [
    { id: 'time', type: 'time', label: { en: 'Time Duration', 'zh-CN': '时间' }, defaultValue: '01:30' }
  ],
  outputs: [
    { id: 'decimal', label: { en: 'Decimal Hours', 'zh-CN': '十进制小时' }, type: 'score' }
  ],
  calculate: (values) => {
    const t = values.time;
    if(!t) return { decimal: 0 };
    const [h, m] = t.split(':').map(Number);
    return { decimal: (h + m/60).toFixed(2) };
  }
};

const timeDurationCalculator: CalculatorConfig = {
  slug: 'time-duration-calculator',
  category: 'date-time',
  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // Clock
  content: {
    title: { en: 'Time Duration Calculator', 'zh-CN': '时长计算器' },
    description: { en: 'Calculate the exact duration between two times (Hours & Minutes).', 'zh-CN': '计算两个时间点之间的确切时长（小时和分钟）。' },
    formula: {
      en: 'Duration = End Time - Start Time',
      'zh-CN': '时长 = 结束时间 - 开始时间'
    },
    article: {
      en: `
        <h3>Calculating Time Differences</h3>
        <p>Easily find out how many hours and minutes have passed between two time points.</p>
        <p>If the end time is earlier than the start time, it is assumed to be the next day.</p>
      `,
      'zh-CN': `
        <h3>计算时间差</h3>
        <p>轻松计算两个时间点之间经过了多少小时和分钟。</p>
        <p>如果结束时间早于开始时间，则默认跨天（假设为第二天）。</p>
      `
    }
  },
  inputs: [
    {
      id: 'startTime',
      type: 'time',
      label: { en: 'Start Time', 'zh-CN': '开始时间' },
      defaultValue: '09:00'
    },
    {
      id: 'endTime',
      type: 'time',
      label: { en: 'End Time', 'zh-CN': '结束时间' },
      defaultValue: '17:30'
    }
  ],
  outputs: [
    { id: 'duration', label: { en: 'Duration', 'zh-CN': '时长' }, type: 'text' },
    { id: 'totalMinutes', label: { en: 'Total Minutes', 'zh-CN': '总分钟数' }, type: 'score', unit: 'min' }
  ],
  calculate: (values) => {
    const start = values.startTime;
    const end = values.endTime;
    
    if (!start || !end) return { duration: '-', totalMinutes: '-' };

    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);

    let startMin = h1 * 60 + m1;
    let endMin = h2 * 60 + m2;

    if (endMin < startMin) {
      endMin += 24 * 60; // Next day
    }

    const diff = endMin - startMin;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return {
      duration: {
        en: `${hours}h ${minutes}m`,
        'zh-CN': `${hours}小时 ${minutes}分钟`
      },
      totalMinutes: diff
    };
  }
};

const timeAdderCalculator: CalculatorConfig = {
  slug: 'time-adder-calculator',
  category: 'date-time',
  icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', // Clock +
  content: {
    title: { en: 'Time Adder', 'zh-CN': '时间加法器' },
    description: { en: 'Add hours and minutes to a specific time.', 'zh-CN': '给特定时间增加小时和分钟。' },
    formula: { en: 'New Time = Start + Duration', 'zh-CN': '新时间 = 开始时间 + 时长' },
    article: {
      en: '<h3>Time Calculation</h3><p>Useful for planning schedules by adding duration to a start time.</p>',
      'zh-CN': '<h3>时间计算</h3><p>通过给开始时间增加时长来规划日程。</p>'
    }
  },
  inputs: [
    { id: 'start', type: 'time', label: { en: 'Start Time', 'zh-CN': '开始时间' }, defaultValue: '14:00' },
    { id: 'addHours', type: 'number', label: { en: 'Hours to Add', 'zh-CN': '增加小时' }, defaultValue: 1 },
    { id: 'addMinutes', type: 'number', label: { en: 'Minutes to Add', 'zh-CN': '增加分钟' }, defaultValue: 30 },
  ],
  outputs: [
    { id: 'newTime', label: { en: 'New Time', 'zh-CN': '新时间' }, type: 'text' }
  ],
  calculate: (values) => {
    const start = values.start;
    const hAdd = Number(values.addHours) || 0;
    const mAdd = Number(values.addMinutes) || 0;
    
    if(!start) return { newTime: '-' };
    
    const [h, m] = start.split(':').map(Number);
    let totalMin = h * 60 + m + hAdd * 60 + mAdd;
    
    // Normalize to 24h
    totalMin = totalMin % (24 * 60);
    if(totalMin < 0) totalMin += 24*60;
    
    const newH = Math.floor(totalMin / 60);
    const newM = totalMin % 60;
    
    const pad = (n:number) => n.toString().padStart(2, '0');
    return { newTime: `${pad(newH)}:${pad(newM)}` };
  }
};

const unitConverter: CalculatorConfig = {
  slug: 'unit-converter',
  category: 'conversion',
  icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4', // Up down arrows
  content: {
    title: { en: 'Unit Converter', 'zh-CN': '单位换算器' },
    description: { en: 'Convert between common units of length, weight, and temperature.', 'zh-CN': '在长度、重量和温度的常用单位之间进行换算。' },
    formula: {
      en: 'Output = Input × Conversion Factor',
      'zh-CN': '输出 = 输入 × 换算系数'
    },
    article: {
       en: `
         <h3>How to use the Unit Converter</h3>
         <p>Select the unit you want to convert from and the unit you want to convert to. Enter the value, and the result will update automatically.</p>
         <p>Supported categories:</p>
         <ul>
           <li><strong>Length:</strong> Meters, Kilometers, Centimeters, Millimeters, Feet, Inches</li>
           <li><strong>Weight:</strong> Kilograms, Grams, Pounds, Ounces</li>
           <li><strong>Temperature:</strong> Celsius, Fahrenheit</li>
         </ul>
         <p><em>Note: If you select incompatible units (e.g., Meters to Kilograms), the result will show an error.</em></p>
       `,
       'zh-CN': `
         <h3>如何使用单位换算器</h3>
         <p>选择您要换算的源单位和目标单位。输入数值后，结果将自动更新。</p>
         <p>支持的类别：</p>
         <ul>
           <li><strong>长度：</strong> 米、千米、厘米、毫米、英尺、英寸</li>
           <li><strong>重量：</strong> 千克、克、磅、盎司</li>
           <li><strong>温度：</strong> 摄氏度、华氏度</li>
         </ul>
         <p><em>注意：如果您选择了不兼容的单位（例如从米换算到千克），结果将显示错误。</em></p>
       `
    }
  },
  inputs: [
    {
      id: 'value',
      type: 'number',
      label: { en: 'Value', 'zh-CN': '数值' },
      defaultValue: 1
    },
    {
      id: 'fromUnit',
      type: 'select',
      label: { en: 'From', 'zh-CN': '从' },
      defaultValue: 'm',
      options: [
        { value: 'm', label: { en: 'Meters (m)', 'zh-CN': '米 (m)' } },
        { value: 'km', label: { en: 'Kilometers (km)', 'zh-CN': '千米 (km)' } },
        { value: 'cm', label: { en: 'Centimeters (cm)', 'zh-CN': '厘米 (cm)' } },
        { value: 'mm', label: { en: 'Millimeters (mm)', 'zh-CN': '毫米 (mm)' } },
        { value: 'ft', label: { en: 'Feet (ft)', 'zh-CN': '英尺 (ft)' } },
        { value: 'in', label: { en: 'Inches (in)', 'zh-CN': '英寸 (in)' } },
        { value: 'kg', label: { en: 'Kilograms (kg)', 'zh-CN': '千克 (kg)' } },
        { value: 'g', label: { en: 'Grams (g)', 'zh-CN': '克 (g)' } },
        { value: 'lb', label: { en: 'Pounds (lb)', 'zh-CN': '磅 (lb)' } },
        { value: 'oz', label: { en: 'Ounces (oz)', 'zh-CN': '盎司 (oz)' } },
        { value: 'c', label: { en: 'Celsius (°C)', 'zh-CN': '摄氏度 (°C)' } },
        { value: 'f', label: { en: 'Fahrenheit (°F)', 'zh-CN': '华氏度 (°F)' } },
      ]
    },
    {
      id: 'toUnit',
      type: 'select',
      label: { en: 'To', 'zh-CN': '到' },
      defaultValue: 'ft',
      options: [
        { value: 'm', label: { en: 'Meters (m)', 'zh-CN': '米 (m)' } },
        { value: 'km', label: { en: 'Kilometers (km)', 'zh-CN': '千米 (km)' } },
        { value: 'cm', label: { en: 'Centimeters (cm)', 'zh-CN': '厘米 (cm)' } },
        { value: 'mm', label: { en: 'Millimeters (mm)', 'zh-CN': '毫米 (mm)' } },
        { value: 'ft', label: { en: 'Feet (ft)', 'zh-CN': '英尺 (ft)' } },
        { value: 'in', label: { en: 'Inches (in)', 'zh-CN': '英寸 (in)' } },
        { value: 'kg', label: { en: 'Kilograms (kg)', 'zh-CN': '千克 (kg)' } },
        { value: 'g', label: { en: 'Grams (g)', 'zh-CN': '克 (g)' } },
        { value: 'lb', label: { en: 'Pounds (lb)', 'zh-CN': '磅 (lb)' } },
        { value: 'oz', label: { en: 'Ounces (oz)', 'zh-CN': '盎司 (oz)' } },
        { value: 'c', label: { en: 'Celsius (°C)', 'zh-CN': '摄氏度 (°C)' } },
        { value: 'f', label: { en: 'Fahrenheit (°F)', 'zh-CN': '华氏度 (°F)' } },
      ]
    }
  ],
  outputs: [
    { id: 'result', label: { en: 'Result', 'zh-CN': '结果' }, type: 'text' }
  ],
  calculate: (values) => {
    const val = Number(values.value);
    const from = values.fromUnit;
    const to = values.toUnit;
    
    if (isNaN(val)) return { result: '-' };

    const conversions: Record<string, { type: string, toBase: (n: number) => number, fromBase: (n: number) => number, symbol: string }> = {
      // Length (Base: m)
      m:  { type: 'len', symbol: 'm',  toBase: n => n,          fromBase: n => n },
      km: { type: 'len', symbol: 'km', toBase: n => n * 1000,   fromBase: n => n / 1000 },
      cm: { type: 'len', symbol: 'cm', toBase: n => n / 100,    fromBase: n => n * 100 },
      mm: { type: 'len', symbol: 'mm', toBase: n => n / 1000,   fromBase: n => n * 1000 },
      ft: { type: 'len', symbol: 'ft', toBase: n => n * 0.3048, fromBase: n => n / 0.3048 },
      in: { type: 'len', symbol: 'in', toBase: n => n * 0.0254, fromBase: n => n / 0.0254 },
      
      // Weight (Base: kg)
      kg: { type: 'wgt', symbol: 'kg', toBase: n => n,             fromBase: n => n },
      g:  { type: 'wgt', symbol: 'g',  toBase: n => n / 1000,      fromBase: n => n * 1000 },
      lb: { type: 'wgt', symbol: 'lb', toBase: n => n * 0.453592,  fromBase: n => n / 0.453592 },
      oz: { type: 'wgt', symbol: 'oz', toBase: n => n * 0.0283495, fromBase: n => n / 0.0283495 },
      
      // Temperature (Base: C)
      c:  { type: 'tmp', symbol: '°C', toBase: n => n,             fromBase: n => n },
      f:  { type: 'tmp', symbol: '°F', toBase: n => (n - 32) * 5/9, fromBase: n => (n * 9/5) + 32 },
    };

    const fromConf = conversions[from];
    const toConf = conversions[toConf ? to : '']; // Safety check

    if (!fromConf || !toConf || fromConf.type !== toConf.type) {
      return { result: { en: 'Incompatible Units', 'zh-CN': '单位不兼容' } };
    }

    const base = fromConf.toBase(val);
    const result = toConf.fromBase(base);

    // Smart precision
    let precision = 4;
    if (Math.abs(result) < 1e-6) precision = 8;
    else if (Math.abs(result) >= 1000) precision = 2;
    if (Number.isInteger(result)) precision = 0; // Clean integers

    // Handle floating point errors for integers (e.g. 3.0000000004)
    const fixed = parseFloat(result.toFixed(precision));

    return { result: `${fixed} ${toConf.symbol}` };
  }
};

const areaConverter: CalculatorConfig = {
  slug: 'area-converter',
  category: 'conversion',
  icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', // Grid/Area
  content: {
    title: { en: 'Area Converter', 'zh-CN': '面积换算器' },
    description: { en: 'Convert between sq meters, sq feet, acres, and hectares.', 'zh-CN': '在平方米、平方英尺、英亩和公顷之间进行换算。' },
    formula: { en: 'Input * Factor', 'zh-CN': '输入 * 系数' },
    article: {
      en: '<h3>Area Conversion</h3><p>Useful for land and real estate.</p>',
      'zh-CN': '<h3>面积换算</h3><p>适用于土地和房地产。</p>'
    }
  },
  inputs: [
    { id: 'value', type: 'number', label: { en: 'Value', 'zh-CN': '数值' }, defaultValue: 1 },
    {
      id: 'fromUnit', type: 'select', label: { en: 'From', 'zh-CN': '从' }, defaultValue: 'm2',
      options: [
        { value: 'm2', label: { en: 'Sq Meter (m²)', 'zh-CN': '平方米' } },
        { value: 'ft2', label: { en: 'Sq Feet (ft²)', 'zh-CN': '平方英尺' } },
        { value: 'ac', label: { en: 'Acres', 'zh-CN': '英亩' } },
        { value: 'ha', label: { en: 'Hectares', 'zh-CN': '公顷' } },
      ]
    },
    {
      id: 'toUnit', type: 'select', label: { en: 'To', 'zh-CN': '到' }, defaultValue: 'ft2',
      options: [
        { value: 'm2', label: { en: 'Sq Meter (m²)', 'zh-CN': '平方米' } },
        { value: 'ft2', label: { en: 'Sq Feet (ft²)', 'zh-CN': '平方英尺' } },
        { value: 'ac', label: { en: 'Acres', 'zh-CN': '英亩' } },
        { value: 'ha', label: { en: 'Hectares', 'zh-CN': '公顷' } },
      ]
    }
  ],
  outputs: [ { id: 'result', label: { en: 'Result', 'zh-CN': '结果' }, type: 'text' } ],
  calculate: (values) => {
    const v = Number(values.value) || 0;
    // Base: m2
    const factors: Record<string, number> = {
      m2: 1,
      ft2: 0.092903,
      ac: 4046.86,
      ha: 10000
    };
    const base = v * factors[values.fromUnit];
    const res = base / factors[values.toUnit];
    return { result: `${res.toFixed(4)} ${values.toUnit}` };
  }
};

const pressureConverter: CalculatorConfig = {
  slug: 'pressure-converter',
  category: 'conversion',
  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // Gauge (reuse clock)
  content: {
    title: { en: 'Pressure Converter', 'zh-CN': '压强换算器' },
    description: { en: 'Convert between Pascal, Bar, PSI, and Atm.', 'zh-CN': '在帕斯卡、巴、PSI 和标准大气压之间换算。' },
    formula: { en: 'Input * Factor', 'zh-CN': '输入 * 系数' },
    article: {
      en: '<h3>Pressure Units</h3><p>Common units for tires and weather.</p>',
      'zh-CN': '<h3>压强单位</h3><p>常用于轮胎和天气。</p>'
    }
  },
  inputs: [
    { id: 'value', type: 'number', label: { en: 'Value', 'zh-CN': '数值' }, defaultValue: 100 },
    {
      id: 'fromUnit', type: 'select', label: { en: 'From', 'zh-CN': '从' }, defaultValue: 'psi',
      options: [
        { value: 'pa', label: { en: 'Pascal (Pa)', 'zh-CN': '帕斯卡' } },
        { value: 'bar', label: { en: 'Bar', 'zh-CN': '巴' } },
        { value: 'psi', label: { en: 'PSI', 'zh-CN': 'PSI' } },
        { value: 'atm', label: { en: 'Atmosphere (atm)', 'zh-CN': '标准大气压' } },
      ]
    },
    {
      id: 'toUnit', type: 'select', label: { en: 'To', 'zh-CN': '到' }, defaultValue: 'bar',
      options: [
        { value: 'pa', label: { en: 'Pascal (Pa)', 'zh-CN': '帕斯卡' } },
        { value: 'bar', label: { en: 'Bar', 'zh-CN': '巴' } },
        { value: 'psi', label: { en: 'PSI', 'zh-CN': 'PSI' } },
        { value: 'atm', label: { en: 'Atmosphere (atm)', 'zh-CN': '标准大气压' } },
      ]
    }
  ],
  outputs: [ { id: 'result', label: { en: 'Result', 'zh-CN': '结果' }, type: 'text' } ],
  calculate: (values) => {
    const v = Number(values.value) || 0;
    // Base: Pa
    const factors: Record<string, number> = {
      pa: 1,
      bar: 100000,
      psi: 6894.76,
      atm: 101325
    };
    const base = v * factors[values.fromUnit];
    const res = base / factors[values.toUnit];
    return { result: `${res.toFixed(4)} ${values.toUnit}` };
  }
};

const volumeConverter: CalculatorConfig = {
  slug: 'volume-converter',
  category: 'conversion',
  icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', // Beaker (reused from GPA for now, better SVG needed normally)
  content: {
    title: { en: 'Volume Converter', 'zh-CN': '体积/容量换算器' },
    description: { en: 'Convert between Liters, Gallons, Cups, and more.', 'zh-CN': '在升、加仑、杯等单位之间进行换算。' },
    formula: { en: 'Output = Input × Factor', 'zh-CN': '输出 = 输入 × 系数' },
    article: {
      en: '<h3>Volume Conversion</h3><p>Useful for cooking and science.</p>',
      'zh-CN': '<h3>体积换算</h3><p>适用于烹饪和科学实验。</p>'
    }
  },
  inputs: [
    { id: 'value', type: 'number', label: { en: 'Value', 'zh-CN': '数值' }, defaultValue: 1 },
    {
      id: 'fromUnit', type: 'select', label: { en: 'From', 'zh-CN': '从' }, defaultValue: 'l',
      options: [
        { value: 'l', label: { en: 'Liters (L)', 'zh-CN': '升 (L)' } },
        { value: 'ml', label: { en: 'Milliliters (ml)', 'zh-CN': '毫升 (ml)' } },
        { value: 'gal', label: { en: 'Gallons (US)', 'zh-CN': '美制加仑' } },
        { value: 'cup', label: { en: 'Cups (US)', 'zh-CN': '美制杯' } },
        { value: 'floz', label: { en: 'Fluid Ounces (US)', 'zh-CN': '美制液盎司' } },
      ]
    },
    {
      id: 'toUnit', type: 'select', label: { en: 'To', 'zh-CN': '到' }, defaultValue: 'gal',
      options: [
        { value: 'l', label: { en: 'Liters (L)', 'zh-CN': '升 (L)' } },
        { value: 'ml', label: { en: 'Milliliters (ml)', 'zh-CN': '毫升 (ml)' } },
        { value: 'gal', label: { en: 'Gallons (US)', 'zh-CN': '美制加仑' } },
        { value: 'cup', label: { en: 'Cups (US)', 'zh-CN': '美制杯' } },
        { value: 'floz', label: { en: 'Fluid Ounces (US)', 'zh-CN': '美制液盎司' } },
      ]
    }
  ],
  outputs: [ { id: 'result', label: { en: 'Result', 'zh-CN': '结果' }, type: 'text' } ],
  calculate: (values) => {
    const val = Number(values.value);
    if (isNaN(val)) return { result: '-' };
    
    // Base: Liters
    const factors: Record<string, number> = {
        l: 1,
        ml: 0.001,
        gal: 3.78541,
        cup: 0.236588,
        floz: 0.0295735
    };
    
    const baseVal = val * factors[values.fromUnit];
    const res = baseVal / factors[values.toUnit];
    
    return { result: `${parseFloat(res.toFixed(4))} ${values.toUnit.toUpperCase()}` };
  }
};

const speedConverter: CalculatorConfig = {
  slug: 'speed-converter',
  category: 'conversion',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Lightning/Speed
  content: {
    title: { en: 'Speed Converter', 'zh-CN': '速度换算器' },
    description: { en: 'Convert between different units of speed like mph, km/h, and m/s.', 'zh-CN': '在英里/小时、千米/小时、米/秒等速度单位之间进行换算。' },
    formula: {
      en: '1 m/s = 3.6 km/h = 2.237 mph',
      'zh-CN': '1 m/s = 3.6 km/h = 2.237 mph'
    },
    article: {
      en: `<h3>Speed Conversion</h3><p>Convert speed measurements accurately.</p>`,
      'zh-CN': `<h3>速度换算</h3><p>准确换算速度测量值。</p>`
    }
  },
  inputs: [
    { id: 'value', type: 'number', label: { en: 'Value', 'zh-CN': '数值' }, defaultValue: 100 },
    {
      id: 'fromUnit', type: 'select', label: { en: 'From', 'zh-CN': '从' }, defaultValue: 'kmh',
      options: [
        { value: 'kmh', label: { en: 'km/h', 'zh-CN': '千米/小时' } },
        { value: 'mph', label: { en: 'mph', 'zh-CN': '英里/小时' } },
        { value: 'ms', label: { en: 'm/s', 'zh-CN': '米/秒' } },
        { value: 'kn', label: { en: 'Knots', 'zh-CN': '节' } },
      ]
    },
    {
      id: 'toUnit', type: 'select', label: { en: 'To', 'zh-CN': '到' }, defaultValue: 'mph',
      options: [
        { value: 'kmh', label: { en: 'km/h', 'zh-CN': '千米/小时' } },
        { value: 'mph', label: { en: 'mph', 'zh-CN': '英里/小时' } },
        { value: 'ms', label: { en: 'm/s', 'zh-CN': '米/秒' } },
        { value: 'kn', label: { en: 'Knots', 'zh-CN': '节' } },
      ]
    }
  ],
  outputs: [ { id: 'result', label: { en: 'Result', 'zh-CN': '结果' }, type: 'text' } ],
  calculate: (values) => {
    const val = Number(values.value);
    if (isNaN(val)) return { result: '-' };
    
    // Base: m/s
    const toBase = {
      ms: (n: number) => n,
      kmh: (n: number) => n / 3.6,
      mph: (n: number) => n / 2.23694,
      kn: (n: number) => n / 1.94384
    };
    const fromBase = {
      ms: (n: number) => n,
      kmh: (n: number) => n * 3.6,
      mph: (n: number) => n * 2.23694,
      kn: (n: number) => n * 1.94384
    };
    
    const baseVal = toBase[values.fromUnit as keyof typeof toBase](val);
    const res = fromBase[values.toUnit as keyof typeof fromBase](baseVal);
    
    // Symbol map
    const symbols: Record<string, string> = { kmh: 'km/h', mph: 'mph', ms: 'm/s', kn: 'kn' };

    return { result: `${parseFloat(res.toFixed(2))} ${symbols[values.toUnit]}` };
  }
};

const dataConverter: CalculatorConfig = {
  slug: 'data-storage-converter',
  category: 'conversion',
  icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', // Database/Storage
  content: {
    title: { en: 'Data Storage Converter', 'zh-CN': '数据存储换算器' },
    description: { en: 'Convert between Bytes, KB, MB, GB, and TB.', 'zh-CN': '在字节、KB、MB、GB 和 TB 之间进行换算。' },
    formula: { en: '1 KB = 1024 Bytes', 'zh-CN': '1 KB = 1024 字节' },
    article: {
      en: '<h3>Digital Storage</h3><p>Uses the binary prefix standard (1024).</p>',
      'zh-CN': '<h3>数字存储</h3><p>使用二进制前缀标准 (1024)。</p>'
    }
  },
  inputs: [
    { id: 'value', type: 'number', label: { en: 'Value', 'zh-CN': '数值' }, defaultValue: 1 },
    {
      id: 'fromUnit', type: 'select', label: { en: 'From', 'zh-CN': '从' }, defaultValue: 'gb',
      options: [
        { value: 'b', label: { en: 'Bytes (B)', 'zh-CN': '字节 (B)' } },
        { value: 'kb', label: { en: 'Kilobytes (KB)', 'zh-CN': 'KB' } },
        { value: 'mb', label: { en: 'Megabytes (MB)', 'zh-CN': 'MB' } },
        { value: 'gb', label: { en: 'Gigabytes (GB)', 'zh-CN': 'GB' } },
        { value: 'tb', label: { en: 'Terabytes (TB)', 'zh-CN': 'TB' } },
      ]
    },
    {
      id: 'toUnit', type: 'select', label: { en: 'To', 'zh-CN': '到' }, defaultValue: 'mb',
      options: [
        { value: 'b', label: { en: 'Bytes (B)', 'zh-CN': '字节 (B)' } },
        { value: 'kb', label: { en: 'Kilobytes (KB)', 'zh-CN': 'KB' } },
        { value: 'mb', label: { en: 'Megabytes (MB)', 'zh-CN': 'MB' } },
        { value: 'gb', label: { en: 'Gigabytes (GB)', 'zh-CN': 'GB' } },
        { value: 'tb', label: { en: 'Terabytes (TB)', 'zh-CN': 'TB' } },
      ]
    }
  ],
  outputs: [ { id: 'result', label: { en: 'Result', 'zh-CN': '结果' }, type: 'text' } ],
  calculate: (values) => {
    const val = Number(values.value);
    if (isNaN(val)) return { result: '-' };

    const powers: Record<string, number> = { b: 0, kb: 1, mb: 2, gb: 3, tb: 4 };
    const diff = powers[values.fromUnit] - powers[values.toUnit];
    
    const res = val * Math.pow(1024, diff);
    
    // Format nicely
    let formatted = res.toString();
    if (res % 1 !== 0) formatted = res.toFixed(2);
    if (Math.abs(res) < 0.01) formatted = res.toExponential(2);
    if (formatted.endsWith('.00')) formatted = formatted.slice(0, -3);

    return { result: `${formatted} ${values.toUnit.toUpperCase()}` };
  }
};

const loanCalculator: CalculatorConfig = {
  slug: 'loan-calculator',
  category: 'finance',
  icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', // Building / Bank style
  content: {
    title: {
      en: 'Loan Calculator',
      'zh-CN': '贷款计算器'
    },
    description: {
      en: 'Calculate monthly payments and total interest for loans or mortgages.',
      'zh-CN': '计算贷款或按揭的月供和总利息。'
    },
    formula: {
      en: 'M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]',
      'zh-CN': '月供 = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]'
    },
    article: {
      en: `
        <h3>How Loan Payments are Calculated</h3>
        <p>This calculator uses the standard amortization formula to determine your monthly payments.</p>
        <p><strong>Formula:</strong></p>
        <p><code>M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]</code></p>
        <ul>
          <li><strong>M</strong> = Total monthly payment</li>
          <li><strong>P</strong> = Principal loan amount</li>
          <li><strong>i</strong> = Monthly interest rate (Annual Rate / 12)</li>
          <li><strong>n</strong> = Number of months (Years × 12)</li>
        </ul>
        <p>The Total Interest is calculated by subtracting the Principal from the Total Repayment Amount.</p>
      `,
      'zh-CN': `
        <h3>如何计算贷款还款额</h3>
        <p>此计算器使用标准的摊销公式来确定您的月供。</p>
        <p><strong>公式：</strong></p>
        <p><code>M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]</code></p>
        <ul>
          <li><strong>M</strong> = 月供总额</li>
          <li><strong>P</strong> = 贷款本金</li>
          <li><strong>i</strong> = 月利率 (年利率 / 12)</li>
          <li><strong>n</strong> = 还款月数 (年数 × 12)</li>
        </ul>
        <p>总利息是通过从还款总额中减去本金计算得出的。</p>
      `
    }
  },
  inputs: [
    {
      id: 'principal',
      type: 'number',
      label: { en: 'Loan Amount', 'zh-CN': '贷款金额' },
      unit: '$',
      defaultValue: 100000,
      validation: { min: 1000 }
    },
    {
      id: 'rate',
      type: 'number',
      label: { en: 'Annual Interest Rate', 'zh-CN': '年利率' },
      unit: '%',
      defaultValue: 5,
      validation: { min: 0, max: 100 }
    },
    {
      id: 'term',
      type: 'number',
      label: { en: 'Loan Term', 'zh-CN': '贷款期限' },
      unit: 'years',
      defaultValue: 30,
      validation: { min: 1, max: 100 }
    }
  ],
  outputs: [
    {
      id: 'monthlyPayment',
      label: { en: 'Monthly Payment', 'zh-CN': '月供' },
      type: 'currency',
      unit: '$'
    },
    {
      id: 'totalInterest',
      label: { en: 'Total Interest', 'zh-CN': '总利息' },
      type: 'currency',
      unit: '$'
    },
    {
      id: 'totalPayment',
      label: { en: 'Total Repayment', 'zh-CN': '还款总额' },
      type: 'currency',
      unit: '$'
    }
  ],
  calculate: (values) => {
    const principal = Number(values.principal) || 0;
    const rate = Number(values.rate) || 0;
    const termYears = Number(values.term) || 0;

    if (principal <= 0 || termYears <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    // Monthly interest rate
    const monthlyRate = (rate / 100) / 12;
    // Total number of payments
    const numberOfPayments = termYears * 12;

    let monthlyPayment = 0;

    if (rate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      // Amortization Formula: M = P * (r * (1+r)^n) / ((1+r)^n - 1)
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    };
  }
};

const mortgageCalculator: CalculatorConfig = {
  slug: 'mortgage-calculator',
  category: 'finance',
  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', // Home icon
  content: {
    title: {
      en: 'Mortgage Calculator',
      'zh-CN': '按揭贷款计算器'
    },
    description: {
      en: 'Calculate your monthly mortgage payments including interest, based on the home price, down payment, and loan terms.',
      'zh-CN': '根据房价、首付和贷款条款计算您的月供和利息。'
    },
    formula: {
      en: 'M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]',
      'zh-CN': '月供 = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]'
    },
    article: {
      en: `
        <h3>Understanding Your Mortgage</h3>
        <p>A mortgage is a loan used to purchase a home. This calculator helps you estimate your monthly payments.</p>
        <p><strong>Key Components:</strong></p>
        <ul>
          <li><strong>Home Price:</strong> The total purchase price of the property.</li>
          <li><strong>Down Payment:</strong> The amount of money you pay upfront. A higher down payment reduces your loan amount.</li>
          <li><strong>Interest Rate:</strong> The cost of borrowing money, expressed as a percentage.</li>
          <li><strong>Loan Term:</strong> The duration of the loan, typically 15 or 30 years.</li>
        </ul>
        <p>Typically, a longer loan term results in lower monthly payments but higher total interest paid over the life of the loan.</p>
      `,
      'zh-CN': `
        <h3>了解您的按揭贷款</h3>
        <p>按揭贷款是用于购买房屋的贷款。此计算器可帮助您估算每月的还款额。</p>
        <p><strong>关键要素：</strong></p>
        <ul>
          <li><strong>房屋价格：</strong> 房产的总购买价格。</li>
          <li><strong>首付：</strong> 您预先支付的金额。较高的首付会减少您的贷款金额。</li>
          <li><strong>利率：</strong> 借款成本，以百分比表示。</li>
          <li><strong>贷款期限：</strong> 贷款的持续时间，通常为 15 年或 30 年。</li>
        </ul>
        <p>通常，较长的贷款期限会导致较低的月供，但在贷款期限内支付的总利息较高。</p>
      `
    }
  },
  inputs: [
    {
      id: 'homePrice',
      type: 'number',
      label: { en: 'Home Price', 'zh-CN': '房屋价格' },
      unit: '$',
      defaultValue: 300000,
      validation: { min: 1000 }
    },
    {
      id: 'downPayment',
      type: 'number',
      label: { en: 'Down Payment', 'zh-CN': '首付' },
      unit: '$',
      defaultValue: 60000,
      validation: { min: 0 }
    },
    {
      id: 'interestRate',
      type: 'number',
      label: { en: 'Annual Interest Rate', 'zh-CN': '年利率' },
      unit: '%',
      defaultValue: 3.5,
      validation: { min: 0, max: 100 }
    },
    {
      id: 'loanTerm',
      type: 'number',
      label: { en: 'Loan Term', 'zh-CN': '贷款期限' },
      unit: 'years',
      defaultValue: 30,
      validation: { min: 1, max: 100 }
    }
  ],
  outputs: [
    {
      id: 'principalLoan',
      label: { en: 'Principal Loan Amount', 'zh-CN': '贷款本金' },
      type: 'currency',
      unit: '$'
    },
    {
      id: 'monthlyPayment',
      label: { en: 'Monthly Payment', 'zh-CN': '月供' },
      type: 'currency',
      unit: '$'
    },
    {
      id: 'totalInterest',
      label: { en: 'Total Interest', 'zh-CN': '总利息' },
      type: 'currency',
      unit: '$'
    },
    {
      id: 'totalPayment',
      label: { en: 'Total Repayment', 'zh-CN': '还款总额' },
      type: 'currency',
      unit: '$'
    }
  ],
  calculate: (values) => {
    const homePrice = Number(values.homePrice) || 0;
    const downPayment = Number(values.downPayment) || 0;
    const rate = Number(values.interestRate) || 0;
    const termYears = Number(values.loanTerm) || 0;

    let principal = homePrice - downPayment;
    if (principal < 0) principal = 0;

    if (principal === 0 || termYears <= 0) {
      return { principalLoan: 0, monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyRate = (rate / 100) / 12;
    const numberOfPayments = termYears * 12;

    let monthlyPayment = 0;

    if (rate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      principalLoan: principal.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    };
  }
};

const tipCalculator: CalculatorConfig = {
  slug: 'tip-calculator',
  category: 'finance',
  icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', // Wallet icon
  content: {
    title: { en: 'Tip Calculator', 'zh-CN': '小费计算器' },
    description: { en: 'Calculate the correct tip amount and split the bill among friends.', 'zh-CN': '计算正确的小费金额并与朋友平分账单。' },
    formula: {
      en: 'Tip Amount = Bill × (Tip % / 100)',
      'zh-CN': '小费金额 = 账单 × (小费比例 / 100)'
    },
    article: {
      en: `
        <h3>Tip Calculator</h3>
        <p>Use this simple tool to determine how much to tip at a restaurant or for a service.</p>
        <p>It also helps you split the total bill (including tip) evenly among a group of people.</p>
      `,
      'zh-CN': `
        <h3>小费计算器</h3>
        <p>使用此简单工具来确定在餐厅或接受服务时应支付多少小费。</p>
        <p>它还可以帮助您在一群人中平均分摊总账单（包括小费）。</p>
      `
    }
  },
  inputs: [
    {
      id: 'billAmount',
      type: 'number',
      label: { en: 'Bill Amount', 'zh-CN': '账单金额' },
      unit: '$',
      defaultValue: 50
    },
    {
      id: 'tipPercent',
      type: 'number',
      label: { en: 'Tip Percentage', 'zh-CN': '小费比例' },
      unit: '%',
      defaultValue: 15
    },
    {
      id: 'peopleCount',
      type: 'number',
      label: { en: 'Number of People', 'zh-CN': '人数' },
      defaultValue: 1,
      validation: { min: 1 }
    }
  ],
  outputs: [
    { id: 'tipAmount', label: { en: 'Tip Amount', 'zh-CN': '小费金额' }, type: 'currency', unit: '$' },
    { id: 'totalAmount', label: { en: 'Total Bill', 'zh-CN': '总金额' }, type: 'currency', unit: '$' },
    { id: 'perPerson', label: { en: 'Per Person', 'zh-CN': '人均支付' }, type: 'currency', unit: '$' },
  ],
  calculate: (values) => {
    const bill = Number(values.billAmount) || 0;
    const tipPct = Number(values.tipPercent) || 0;
    const people = Math.max(1, Number(values.peopleCount) || 1);

    const tipAmount = bill * (tipPct / 100);
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    return {
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      perPerson: perPerson.toFixed(2)
    };
  }
};

const discountCalculator: CalculatorConfig = {
  slug: 'discount-calculator',
  category: 'finance',
  icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', // Tag icon
  content: {
    title: { en: 'Discount Calculator', 'zh-CN': '折扣计算器' },
    description: { en: 'Find out the sale price and how much you save with a discount.', 'zh-CN': '计算折后价格以及您节省了多少钱。' },
    formula: {
      en: 'Final Price = Original Price - (Original Price × Discount % / 100)',
      'zh-CN': '最终价格 = 原价 - (原价 × 折扣率 / 100)'
    },
    article: {
      en: `
        <h3>Discount Calculator</h3>
        <p>Calculating the final price of an item on sale is easy.</p>
        <p>Simply enter the original price tag and the discount percentage (off) to see your savings.</p>
      `,
      'zh-CN': `
        <h3>折扣计算器</h3>
        <p>计算促销商品的最终价格非常简单。</p>
        <p>只需输入原价标签和折扣百分比，即可查看您节省的金额。</p>
      `
    }
  },
  inputs: [
    {
      id: 'price',
      type: 'number',
      label: { en: 'Original Price', 'zh-CN': '原价' },
      unit: '$',
      defaultValue: 100
    },
    {
      id: 'discount',
      type: 'number',
      label: { en: 'Discount', 'zh-CN': '折扣' },
      unit: '%',
      defaultValue: 20
    }
  ],
  outputs: [
    { id: 'savings', label: { en: 'You Save', 'zh-CN': '节省金额' }, type: 'currency', unit: '$' },
    { id: 'finalPrice', label: { en: 'Final Price', 'zh-CN': '折后价格' }, type: 'currency', unit: '$' },
  ],
  calculate: (values) => {
    const price = Number(values.price) || 0;
    const discount = Number(values.discount) || 0;

    const savings = price * (discount / 100);
    const finalPrice = price - savings;

    return {
      savings: savings.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    };
  }
};

const vatCalculator: CalculatorConfig = {
  slug: 'vat-calculator',
  category: 'finance',
  icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z', // Receipt
  content: {
    title: { en: 'VAT / Sales Tax', 'zh-CN': '增值税 / 消费税计算器' },
    description: { en: 'Calculate the tax amount and gross price from the net amount.', 'zh-CN': '根据净额计算税额和总价（含税价）。' },
    formula: {
      en: 'Tax = Net Price × (Tax Rate / 100)',
      'zh-CN': '税额 = 净价 × (税率 / 100)'
    },
    article: {
      en: `
        <h3>Calculating Sales Tax</h3>
        <p>Enter the net price (before tax) and the applicable tax rate to find the total gross price.</p>
        <p><strong>Formula:</strong> <code>Gross = Net + (Net × Rate%)</code></p>
      `,
      'zh-CN': `
        <h3>计算消费税</h3>
        <p>输入净价（税前价格）和适用的税率，即可计算出总价（含税价格）。</p>
        <p><strong>公式：</strong> <code>总价 = 净价 + (净价 × 税率%)</code></p>
      `
    }
  },
  inputs: [
    {
      id: 'netAmount',
      type: 'number',
      label: { en: 'Net Price (Before Tax)', 'zh-CN': '净价 (税前)' },
      unit: '$',
      defaultValue: 100
    },
    {
      id: 'taxRate',
      type: 'number',
      label: { en: 'Tax Rate', 'zh-CN': '税率' },
      unit: '%',
      defaultValue: 10
    }
  ],
  outputs: [
    { id: 'taxAmount', label: { en: 'Tax Amount', 'zh-CN': '税额' }, type: 'currency', unit: '$' },
    { id: 'grossAmount', label: { en: 'Gross Price (Total)', 'zh-CN': '总价 (含税)' }, type: 'currency', unit: '$' }
  ],
  calculate: (values) => {
    const net = Number(values.netAmount) || 0;
    const rate = Number(values.taxRate) || 0;

    const tax = net * (rate / 100);
    const gross = net + tax;

    return {
      taxAmount: tax.toFixed(2),
      grossAmount: gross.toFixed(2)
    };
  }
};

const ageCalculator: CalculatorConfig = {
  slug: 'age-calculator',
  category: 'date-time',
  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // Clock/Time
  content: {
    title: { en: 'Age Calculator', 'zh-CN': '年龄计算器' },
    description: { en: 'Calculate your exact age in years, months, and days.', 'zh-CN': '精确计算您的年龄（年、月、日）。' },
    formula: {
        en: 'Age = Today - Date of Birth',
        'zh-CN': '年龄 = 今天 - 出生日期'
    },
    article: {
      en: `
        <h3>Age Calculation</h3>
        <p>This calculator determines your age based on your date of birth and the current date.</p>
        <p>It provides a detailed breakdown of how many years, months, and days you have been alive.</p>
      `,
      'zh-CN': `
        <h3>年龄计算</h3>
        <p>此计算器根据您的出生日期和当前日期确定您的年龄。</p>
        <p>它提供了您生存的年数、月数和天数的详细分类。</p>
      `
    }
  },
  inputs: [
    {
      id: 'dob',
      type: 'date',
      label: { en: 'Date of Birth', 'zh-CN': '出生日期' },
      defaultValue: '2000-01-01'
    }
  ],
  outputs: [
    { id: 'ageString', label: { en: 'Your Age', 'zh-CN': '您的年龄' }, type: 'text' },
    { id: 'totalDays', label: { en: 'Total Days Alive', 'zh-CN': '生存总天数' }, type: 'score', unit: 'days' }
  ],
  calculate: (values) => {
    const dob = new Date(values.dob);
    const now = new Date();

    if (isNaN(dob.getTime())) return { ageString: '-', totalDays: '-' };

    // Standard constructive logic (same as date calc but fixed end date)
    const d1 = dob;
    const d2 = now;
    
    // Safety check if born in future
    if (d1 > d2) return { ageString: 'Not born yet!', totalDays: 0 };

    const msPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((d2.getTime() - d1.getTime()) / msPerDay);

    let years = d2.getFullYear() - d1.getFullYear();
    const tempDate = new Date(d1);
    tempDate.setFullYear(d1.getFullYear() + years);
    if (tempDate > d2) years--;

    const afterYears = new Date(d1);
    afterYears.setFullYear(d1.getFullYear() + years);

    let months = 0;
    let afterMonths = new Date(afterYears);
    while (true) {
        const targetYear = afterMonths.getFullYear() + Math.floor((afterMonths.getMonth() + 1) / 12);
        const targetMonth = (afterMonths.getMonth() + 1) % 12;
        const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
        const targetDay = Math.min(afterMonths.getDate(), daysInTargetMonth);
        const nextMonth = new Date(targetYear, targetMonth, targetDay);

        if (nextMonth > d2) break;
        afterMonths = nextMonth;
        months++;
        if (months > 12) break;
    }
    
    const remainingMs = d2.getTime() - afterMonths.getTime();
    const days = Math.floor(remainingMs / msPerDay);

    return {
      ageString: {
          en: `${years} years ${months} months ${days} days`,
          'zh-CN': `${years}岁 ${months}个月 ${days}天`
      },
      totalDays: totalDays
    };
  }
};

const salaryCalculator: CalculatorConfig = {
  slug: 'salary-calculator',
  category: 'finance',
  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Dollar/Coin style
  content: {
    title: { en: 'Salary Calculator', 'zh-CN': '薪资计算器' },
    description: { en: 'Convert hourly wage to weekly, monthly, and annual income.', 'zh-CN': '将时薪转换为周薪、月薪和年薪。' },
    formula: {
      en: 'Annual = Hourly Rate × Hours/Week × 52',
      'zh-CN': '年薪 = 时薪 × 每周工时 × 52'
    },
    article: {
      en: `
        <h3>Salary Conversion</h3>
        <p>See how your hourly rate translates into a full salary.</p>
        <p>Assumes 52 weeks per year.</p>
      `,
      'zh-CN': `
        <h3>薪资转换</h3>
        <p>查看您的时薪如何转换为全额薪水。</p>
        <p>假设每年工作 52 周。</p>
      `
    }
  },
  inputs: [
    {
      id: 'hourlyRate',
      type: 'number',
      label: { en: 'Hourly Rate', 'zh-CN': '时薪' },
      unit: '$',
      defaultValue: 25
    },
    {
      id: 'hoursPerWeek',
      type: 'number',
      label: { en: 'Hours per Week', 'zh-CN': '每周工时' },
      unit: 'hrs',
      defaultValue: 40
    }
  ],
  outputs: [
    { id: 'weekly', label: { en: 'Weekly Income', 'zh-CN': '周薪' }, type: 'currency', unit: '$' },
    { id: 'monthly', label: { en: 'Monthly Income', 'zh-CN': '月薪' }, type: 'currency', unit: '$' },
    { id: 'annual', label: { en: 'Annual Income', 'zh-CN': '年薪' }, type: 'currency', unit: '$' },
  ],
  calculate: (values) => {
    const rate = Number(values.hourlyRate) || 0;
    const hours = Number(values.hoursPerWeek) || 0;

    const weekly = rate * hours;
    const annual = weekly * 52;
    const monthly = annual / 12;

    return {
      weekly: weekly.toFixed(2),
      monthly: monthly.toFixed(2),
      annual: annual.toFixed(2)
    };
  }
};

const pregnancyCalculator: CalculatorConfig = {
  slug: 'pregnancy-calculator',
  category: 'health',
  icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', // Heart
  content: {
    title: { en: 'Pregnancy Due Date', 'zh-CN': '预产期计算器' },
    description: { en: 'Estimate your baby\'s due date based on your last period.', 'zh-CN': '根据您的最后一次月经估算宝宝的预产期。' },
    formula: {
      en: 'Due Date = First Day of Last Period + 280 Days',
      'zh-CN': '预产期 = 最后一次月经首日 + 280天'
    },
    article: {
      en: `
        <h3>Estimated Due Date (EDD)</h3>
        <p>The standard way to calculate your due date is to add 280 days (40 weeks) to the first day of your last menstrual period (LMP).</p>
      `,
      'zh-CN': `
        <h3>预产期 (EDD)</h3>
        <p>计算预产期的标准方法是在最后一次月经 (LMP) 的第一天加上 280 天（40 周）。</p>
      `
    }
  },
  inputs: [
    {
      id: 'lastPeriod',
      type: 'date',
      label: { en: 'First Day of Last Period', 'zh-CN': '末次月经第一天' },
      defaultValue: new Date().toISOString().split('T')[0]
    }
  ],
  outputs: [
    { id: 'dueDate', label: { en: 'Estimated Due Date', 'zh-CN': '预计预产期' }, type: 'text' },
    { id: 'weeks', label: { en: 'Current Week', 'zh-CN': '当前孕周' }, type: 'score', unit: 'weeks' }
  ],
  calculate: (values) => {
    const lmp = new Date(values.lastPeriod);
    const now = new Date();

    if (isNaN(lmp.getTime())) return { dueDate: '-', weeks: '-' };

    const dueTime = lmp.getTime() + (280 * 24 * 60 * 60 * 1000);
    const dueDate = new Date(dueTime);

    const diffMs = now.getTime() - lmp.getTime();
    const currentWeek = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    const clampedWeek = Math.max(0, Math.min(42, currentWeek));

    return {
      dueDate: dueDate.toLocaleDateString(),
      weeks: clampedWeek
    };
  }
};


export const calculators: CalculatorConfig[] = [
  bmiCalculator, 
  idealWeightCalculator,
  bodyFatCalculator,
  calorieCalculator,
  waterIntakeCalculator,
  pregnancyCalculator,
  percentageCalculator, 
  fractionCalculator,
  gcdLcmCalculator,
  scientificNotationCalculator,
  pythagoreanCalculator,
  binaryCalculator,
  simpleInterestCalculator,
  compoundInterestCalculator,
  roiCalculator,
  marginCalculator,
  dateCalculator,
  timeDurationCalculator,
  timeAdderCalculator,
  workDaysCalculator,
  decimalHoursCalculator,
  ageCalculator,
  unitConverter,
  volumeConverter,
  speedConverter,
  dataConverter,
  areaConverter,
  pressureConverter,
  finalGradeCalculator,
  gradePercentageCalculator,
  gpaCalculator,
  weightedGradeCalculator,
  readingTimeCalculator,
  attendanceCalculator,
  loanCalculator,
  mortgageCalculator,
  vatCalculator,
  tipCalculator,
  discountCalculator,
  salaryCalculator,
  dogAgeCalculator,
  catAgeCalculator,
  pizzaCalculator,
  fuelCostCalculator, // Now in Life category
  electricityCostCalculator,
  shoeSizeCalculator
];

export const getCalculator = (slug: string) => calculators.find(c => c.slug === slug);
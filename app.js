// 营养需求数据库
const nutrientRequirements = {
  '18-30': { calories: 2400, protein: 56, carbs: 300, fat: 66 },
  '31-50': { calories: 2200, protein: 53, carbs: 280, fat: 60 }
};

// 食物数据库
const foodDatabase = [
  { name: "Chicken Breast", protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice", protein: 2.7, carbs: 23, fat: 0.9 },
  { name: "Avocado", protein: 2, carbs: 8.5, fat: 15 }
];

// 核心算法类
class DietPlanner {
  constructor(age) {
    this.ageGroup = age <= 30 ? '18-30' : '31-50';
    this.nutrientNeeds = nutrientRequirements[this.ageGroup];
    this.currentIntake = { protein: 0, carbs: 0, fat: 0 };
  }

  addFoodConsumption(foodName, quantity) {
    const food = foodDatabase.find(f => f.name === foodName);
    if (food) {
      this.currentIntake.protein += (food.protein * quantity) / 100;
      this.currentIntake.carbs += (food.carbs * quantity) / 100;
      this.currentIntake.fat += (food.fat * quantity) / 100;
    }
  }

  getRecommendations() {
    return {
      protein: Math.max(0, this.nutrientNeeds.protein - this.currentIntake.protein),
      carbs: Math.max(0, this.nutrientNeeds.carbs - this.currentIntake.carbs),
      fat: Math.max(0, this.nutrientNeeds.fat - this.currentIntake.fat)
    };
  }
}

// Vue应用实例
const { createApp } = Vue;
createApp({
  data() {
    return {
      userAge: null,
      selectedFood: 'Chicken Breast',
      foodQuantity: 100,
      consumedFoods: [],
      recommendations: null
    };
  },
  methods: {
    addFood() {
      if (this.selectedFood && this.foodQuantity > 0) {
        this.consumedFoods.push({
          name: this.selectedFood,
          quantity: this.foodQuantity
        });
      }
    },
    generateAdvice() {
      const planner = new DietPlanner(this.userAge);
      this.consumedFoods.forEach(food => {
        planner.addFoodConsumption(food.name, food.quantity);
      });
      this.recommendations = planner.getRecommendations();
    }
  }
}).mount('#app');
class Shape {
  constructor(color) {
    this.color = color;
  }
  // Common methods (if any)
}

class Circle extends Shape {
  constructor(color) {
    super(color);
  }
  render() {
    // Example: A circle centered at (150, 100) with a radius of 50
    return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  constructor(color) {
    super(color);
  }
  render() {
    // Example: A triangle, adjust the points as necessary for your desired shape
    return `<polygon points="150,50 100,150 200,150" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  constructor(color) {
    super(color);
  }
  render() {
    // Example: A square, adjust the x, y, width, and height as necessary for your desired size and position
    return `<rect x="100" y="50" width="100" height="100" fill="${this.color}" />`;
  }
}

// Export the classes using module.exports
module.exports = { Circle, Triangle, Square };

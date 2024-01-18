import inquirer from 'inquirer';
import fs from 'fs';
import { Circle, Triangle, Square } from './shapes.js'; // Import the classes from shapes.mjs


async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'What text would you like to include (up to three characters)?',
      validate: input => input.length <= 3 && input.length > 0 // Validate for 1 to 3 characters
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hex):',
      // Additional validation for color could be added here
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hex):',
      // Additional validation for color could be added here
    }
  ]);
  
  return answers;
}

function generateSvgMarkup(text, textColor, shapeType, shapeColor) {
  const svgStart = '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  const svgEnd = '</svg>';
  let shapeSvg;

  switch (shapeType) {
    case 'circle':
      const circle = new Circle(shapeColor);
      shapeSvg = circle.render();
      break;
    case 'triangle':
      const triangle = new Triangle(shapeColor);
      shapeSvg = triangle.render();
      break;
    case 'square':
      const square = new Square(shapeColor);
      shapeSvg = square.render();
      break;
    default:
      throw new Error('Unknown shape type');
  }

  // Remove the <svg> tags from the rendered shape SVGs
  shapeSvg = shapeSvg.replace('<svg>', '').replace('</svg>', '');

  const textSvg = `<text x="150" y="125" font-family="Verdana" font-size="35" fill="${textColor}" text-anchor="middle">${text}</text>`;
  
  return `${svgStart}${shapeSvg}${textSvg}${svgEnd}`;
}

async function createSvgFile() {
  try {
    const answers = await promptUser();
    const svgContent = generateSvgMarkup(answers.text, answers.textColor, answers.shape, answers.shapeColor);
    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
  } catch (error) {
    console.error('Error creating SVG file:', error);
  }
}

// Execute the main program logic
createSvgFile();

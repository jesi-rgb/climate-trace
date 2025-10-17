const data = require('./src/lib/types/climate-trace.ts');
const fs = require('fs');

// Helper to convert OpenAPI schema to TypeScript interface
function openApiToTS(name, schema) {
	if (!schema.properties) return '';

	const props = Object.entries(schema.properties)
		.map(([key, prop]) => {
			const desc = prop.description ? `\n\t/** ${prop.description} */` : '';
			let type = 'unknown';

			if (prop.type === 'string') type = 'string';
			else if (prop.type === 'number' || prop.type === 'integer') type = 'number';
			else if (prop.type === 'boolean') type = 'boolean';
			else if (prop.type === 'array') {
				if (prop.items?.$ref) {
					const refType = prop.items.$ref.split('/').pop().replace('models.', '');
					type = `${refType}[]`;
				} else if (prop.items?.type === 'string') {
					type = 'string[]';
				} else if (prop.items?.type === 'object') {
					type = 'Record<string, unknown>[]';
				} else {
					type = 'unknown[]';
				}
			} else if (prop.$ref) {
				type = prop.$ref.split('/').pop().replace('models.', '');
			}

			return `${desc}\n\t${key}: ${type};`;
		})
		.join('\n');

	return `export interface ${name} {\n${props}\n}`;
}

// Generate all model interfaces
const schemas = data.ct.components.schemas;
const interfaces = Object.entries(schemas)
	.map(([key, schema]) => {
		const name = key.replace('models.', '');
		return openApiToTS(name, schema);
	})
	.join('\n\n');

const output = `// Auto-generated TypeScript types from Climate TRACE OpenAPI schema
// DO NOT EDIT MANUALLY - regenerate from climate-trace.ts if needed

${interfaces}
`;

fs.writeFileSync('./src/lib/api/schemas/generated.ts', output);
console.log('✅ Generated types in src/lib/api/schemas/generated.ts');

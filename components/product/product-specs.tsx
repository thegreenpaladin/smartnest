// components/product/product-specs.tsx

export const ProductSpecs = ({ specs }: { specs?: Record<string, string> }) => {
  if (!specs) return null;

  return (
    <div className=" w-full max-w-md"> {/* Constraints the width to match the description above */}
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-neutral-400">
        Technical Specifications
      </h3>
      
      <div className="space-y-4">
        {Object.entries(specs).map(([key, value]) => (
          <div 
            key={key} 
            className="flex justify-between items-baseline border-b border-neutral-100 pb-2 transition-colors hover:border-neutral-300"
          >
            {/* The Key - Aligned Left */}
            <span className="text-xs text-neutral-500 font-medium uppercase tracking-tight">
              {key}
            </span>
            
            {/* The Value - Aligned Right */}
            <span className="text-sm text-neutral-900 font-medium text-right ml-4">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
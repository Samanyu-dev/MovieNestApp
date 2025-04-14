//
//  ScrollSection.swift
//  MovieNest
//
//  Created by Samanyu on 03/03/25.
//

import SwiftUI

struct ScrollSection: View {
    @State var title = "Top Recommended"
    @State var posters: [String] = ["poster1", "poster2", "poster3", "poster4", "poster5", "poster6", "poster7", "poster8", "poster9", "poster10"]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20.0){
            Text(title)
                .font(.title2)
                .foregroundColor(.white)
                .fontWeight(.bold)
                .padding(.horizontal, 20)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 20.0) {
                    ForEach(posters.indices, id: \.self) {index in
                    Image(posters[index])
                            .resizable()
                            .frame(width:130, height: 180)
                            .cornerRadius(20)
                    }
                }
                .offset(x: 20)
                .padding(.trailing, 40)
            }
        }
    }
}

struct ScrollSection_Previews: PreviewProvider {
    static var previews: some View {
        ScrollSection()
    }
}

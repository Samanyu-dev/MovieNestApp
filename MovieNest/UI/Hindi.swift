//
//  Hindi.swift
//  MovieNest
//
//  Created by Samanyu on 03/03/25.
//

import SwiftUI

struct Hindi: View {
    @State var title = "Hindi Movies"
    @State var posters: [String] = ["hindi1", "hindi2","bangbang", "hindi3", "hindi4", "hindi5", "hindi6", "hindi7", "hindi8", "hindi9", "hindi10"]
    
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

    struct Hindi_Previews: PreviewProvider {
        static var previews: some View {
            Hindi()
        }
    }

}
